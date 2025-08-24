import { Component, AfterViewInit, OnDestroy, OnInit, NgZone } from '@angular/core';
import gsap from 'gsap';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private ro?: ResizeObserver;

  constructor(private zone: NgZone, private seoService: SeoService) { }

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Sobre mí',
      description: 'Conoce a Raúl Báez (Liyodev): Mi historia como desarrollador desde el instituto hasta convertirme en fullstack developer y creador de videojuegos. Pasión, tecnología y creatividad.',
      keywords: 'sobre mí Liyodev, historia desarrollador, fullstack developer, trayectoria programador, Angular Unity developer',
      image: 'https://avatars.githubusercontent.com/u/77936857?s=400&u=a748a1ec6bc40e6ec277cb309ddfd85d7f4ff8cb&v=4'
    });
  }

  ngAfterViewInit(): void {
    // Siempre sube arriba al entrar en la sección
    if (window.matchMedia('(max-width: 768px)').matches) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }

    this.animateAboutSection();
    this.scheduleFirstCardFix();
  }

  ngOnDestroy(): void {
    this.ro?.disconnect();
  }

  private animateAboutSection(): void {
    gsap.from('.about-section .section-title h2', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.profile-summary', { y: 18, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' });
    gsap.from('.skill-category', { y: 32, opacity: 0, duration: 0.6, stagger: 0.12, delay: 0.2, ease: 'back.out(1.2)' });
    gsap.from('.skill-tag', { y: 6, opacity: 0, duration: 0.3, stagger: 0.03, delay: 0.5, ease: 'power2.out' });
  }

  /** Botones del carrusel (móvil) */
  scrollCarousel(dir: number) {
    const el = document.getElementById('skillsCarousel') as HTMLElement | null;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  }


  /** Correcciones robustas tras navegación/animaciones */
  private scheduleFirstCardFix(): void {
    if (!window.matchMedia('(max-width: 768px)').matches) return;

    const run = () => this.ensureFirstCardFullyVisible();

    // Varias pasadas: inmediato + tras layout/animaciones + tras fuentes
    [0, 120, 360, 900].forEach(ms => setTimeout(run, ms));
    gsap.delayedCall(1.1, run);
    // cuando cargan las fuentes (si está soportado)
    (document as any).fonts?.ready?.then(() => run());

    // Cambios de barra/altura al entrar (2s)
    this.ro = new ResizeObserver(() => run());
    this.ro.observe(document.documentElement);
    setTimeout(() => this.ro?.disconnect(), 2000);
  }

  private ensureFirstCardFullyVisible(): void {
    const first = document.querySelector('.skill-category') as HTMLElement | null;
    if (!first) return;

    // Si la parte inferior de la card queda por debajo del viewport, sube lo necesario
    const r = first.getBoundingClientRect();
    const safeBottom = window.innerHeight - 6; // margen pequeño
    const delta = r.bottom - safeBottom;

    if (delta > 0) {
      window.scrollBy({ top: delta, left: 0, behavior: 'auto' });
    }
  }
}
