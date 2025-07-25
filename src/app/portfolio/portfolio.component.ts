import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements AfterViewInit {
  @ViewChild('carousel') carousel!: ElementRef<HTMLDivElement>;
  private cardWidth = 280; // Ancho de cada tarjeta más el gap
  private animationInProgress = false;

  projects = [
    {
      title: 'Capsule Chaos',
      description: 'Explora mazmorras procedurales en un emocionante multijugador online.',
      link: 'https://liyodev.itch.io/capsule-chaos',
      type: 'Action'
    },
    {
      title: 'Alex´s Adventure',
      description: 'The Curse Of Eternal Night - Una aventura épica',
      link: 'https://nonamegamesmlg.itch.io/alexs-adventure-the-curse-of-eternal-night',
      type: 'Adventure'
    },
    {
      title: 'Run, Down, Run',
      description: 'Un juego de plataformas desafiante',
      link: 'https://liyodev.itch.io/run-down-run',
      type: 'Platformer'
    },
    {
      title: 'Chickentive',
      description: 'Puzzle game desarrollado para la Universidad de Málaga',
      link: 'https://liyodev.itch.io/chickentive',
      type: 'Puzzle'
    },
    {
      title: 'Pompita y su pajita',
      description: 'Juego de carreras desarrollado para la MálagaJam',
      link: 'https://liyodev.itch.io/malagajam19',
      type: 'Racing'
    },
    {
      title: 'Sincronizados',
      description: 'Puzzle cooperativo multijugador',
      link: 'https://liyodev.itch.io/sincronizados',
      type: 'Puzzle'
    },
    {
      title: 'Pablito plantó un Pinito',
      description: '¡Planta tu pinito en esta aventura de acción!',
      link: 'https://liyodev.itch.io/pablitopinito',
      type: 'Action'
    },
    {
      title: 'Málaga RPG',
      description: 'Juego de aventuras desarrollado para la Game Jam 17',
      link: 'https://liyodev.itch.io/malaga-rpg',
      type: 'Adventure'
    }
  ];

  ngAfterViewInit() {
    this.animatePortfolio();
  }

  private animatePortfolio() {
    gsap.from('.section-title h2', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.project-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.2)',
      delay: 0.5
    });
  }

  scrollCarousel(direction: number) {
    if (this.animationInProgress || !this.carousel?.nativeElement) return;
    
    this.animationInProgress = true;
    const el = this.carousel.nativeElement;
    const currentScroll = el.scrollLeft;
    const scrollAmount = direction * (this.cardWidth + 32); // 32px es el gap

    gsap.to(el, {
      scrollLeft: currentScroll + scrollAmount,
      duration: 0.5,
      ease: "power2.out",
      onComplete: () => {
        this.animationInProgress = false;
      }
    });
  }
}
