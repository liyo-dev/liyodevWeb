import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
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
  private scrollLocked = false;
  
  // Variables para touch events
  private touchStartY = 0;
  private touchEndY = 0;
  private isMobile = false;

  readonly scrollRoutes = ['/', '/portfolio', '/about', '/contact'];
  
  // Gradientes para cada sección
  private readonly sectionBackgrounds = [
    'linear-gradient(135deg, #1f1c2c, #928dab)', // Home
    'linear-gradient(135deg, #2c3e50, #4ca1af)', // Portfolio
    'linear-gradient(135deg, #2c3e50, #4ca1af)', // About
    'linear-gradient(135deg, #2c3e50, #4ca1af)'  // Contact
  ];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log('Navigation ended:', event.urlAfterRedirects);
        const idx = this.scrollRoutes.indexOf(event.urlAfterRedirects);
        this.currentIndex = idx >= 0 ? idx : 0;
        console.log('Current index:', this.currentIndex);

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
    this.isMobile = window.innerWidth <= 768;
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

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  // Navegación por scroll del mouse (desktop)
  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isMobile || this.scrollLocked) return;
    this.handleNavigation(event.deltaY > 0 ? 1 : -1);
  }

  // Touch events para móvil
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    if (!this.isMobile) return;
    this.touchStartY = event.touches[0].clientY;
    console.log('Touch start Y:', this.touchStartY);
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    if (!this.isMobile || this.scrollLocked) return;
    
    this.touchEndY = event.changedTouches[0].clientY;
    const deltaY = this.touchStartY - this.touchEndY;
    const minSwipeDistance = 50; // Distancia mínima para activar navegación

    console.log('Touch end Y:', this.touchEndY, 'Delta Y:', deltaY);

    if (Math.abs(deltaY) > minSwipeDistance) {
      console.log('Swipe detected, direction:', deltaY > 0 ? 'up' : 'down');
      // Deslizar hacia arriba (deltaY > 0) = siguiente sección
      // Deslizar hacia abajo (deltaY < 0) = sección anterior
      this.handleNavigation(deltaY > 0 ? 1 : -1);
    }
  }

  private handleNavigation(direction: number) {
    if (this.scrollLocked) return;

    this.scrollLocked = true;
    let newIndex = this.currentIndex + direction;

    if (newIndex >= 0 && newIndex < this.scrollRoutes.length) {
      // Cambiar fondo antes de la transición
      this.updateBackground(newIndex);
      
      // Fade out más suave
      gsap.to(this.workarea.nativeElement, {
        opacity: 0,
        scale: 0.95, // Pequeño escalado para transición más suave
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          this.router.navigateByUrl(this.scrollRoutes[newIndex]);
        }
      });
    } else {
      this.scrollLocked = false;
    }

    setTimeout(() => {
      this.scrollLocked = false;
    }, 800); // Reducir el tiempo de bloqueo
  }

}
