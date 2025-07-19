import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import gsap from 'gsap';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  @ViewChild('workarea', { static: true }) workarea!: ElementRef;

  private currentIndex = 0;
  private scrollLocked = false;

  readonly scrollRoutes = ['/', '/portfolio', '/about', '/contact'];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const idx = this.scrollRoutes.indexOf(event.urlAfterRedirects);
        this.currentIndex = idx >= 0 ? idx : 0;

        // Animación de entrada con GSAP
        gsap.fromTo(
          this.workarea.nativeElement,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
  }

  ngAfterViewInit(): void {
    gsap.set(this.workarea.nativeElement, { opacity: 1 });
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.scrollLocked) return;

    this.scrollLocked = true;

    const direction = event.deltaY > 0 ? 1 : -1;
    let newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.scrollRoutes.length) {
      // Fade out antes de cambiar de ruta
      gsap.to(this.workarea.nativeElement, {
        opacity: 0,
        y: -30,
        duration: 0.4,
        ease: 'power1.in',
        onComplete: () => {
          this.router.navigateByUrl(this.scrollRoutes[newIndex]);
        }
      });
    } else {
      this.scrollLocked = false;
    }

    setTimeout(() => {
      this.scrollLocked = false;
    }, 1000);
  }

}
