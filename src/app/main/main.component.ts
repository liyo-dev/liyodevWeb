import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import gsap from 'gsap';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterModule, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent implements AfterViewInit {
  @ViewChild('workarea', { static: true }) workarea!: ElementRef;
  @ViewChild('background', { static: true }) background!: ElementRef;

  private currentIndex = 0;

  readonly scrollRoutes = ['/', '/portfolio', '/about', '/contact'];
  
  // Gradientes para cada sección - unificados
  private readonly sectionBackgrounds = [
    'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168, 85, 247, 0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.16), transparent 45%), linear-gradient(135deg, #0b0f19 0%, #0f172a 50%, #0b0f19 100%)', // Home
    'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168, 85, 247, 0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.16), transparent 45%), linear-gradient(135deg, #0b0f19 0%, #0f172a 50%, #0b0f19 100%)', // Portfolio
    'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168, 85, 247, 0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.16), transparent 45%), linear-gradient(135deg, #0b0f19 0%, #0f172a 50%, #0b0f19 100%)', // About
    'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.2), transparent 40%), radial-gradient(circle at 80% 10%, rgba(168, 85, 247, 0.18), transparent 35%), radial-gradient(circle at 20% 80%, rgba(34, 211, 238, 0.16), transparent 45%), linear-gradient(135deg, #0b0f19 0%, #0f172a 50%, #0b0f19 100%)'  // Contact
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const idx = this.scrollRoutes.indexOf(event.urlAfterRedirects);
        this.currentIndex = idx >= 0 ? idx : 0;

        // Cambiar el fondo suavemente
        this.updateBackground(this.currentIndex);

        // Animación de entrada con GSAP más suave
        gsap.fromTo(
          this.workarea.nativeElement,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
        );
      }
    });
  }

  ngAfterViewInit(): void {
    gsap.set(this.workarea.nativeElement, { opacity: 1 });
    // Configurar fondo inicial
    this.updateBackground(this.currentIndex);
  }

  private updateBackground(index: number) {
    if (this.background && this.background.nativeElement) {
      // Transición suave del fondo
      gsap.to(this.background.nativeElement, {
        duration: 0.6,
        ease: 'power2.inOut',
        onStart: () => {
          this.background.nativeElement.style.background = this.sectionBackgrounds[index];
        }
      });
    }
  }

}
