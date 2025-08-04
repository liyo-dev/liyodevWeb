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
  @ViewChild('tabsContainer') tabsContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('tabIndicator') tabIndicator!: ElementRef<HTMLDivElement>;
  @ViewChild('contentContainer') contentContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('steamTab') steamTab!: ElementRef<HTMLButtonElement>;
  @ViewChild('mobileTab') mobileTab!: ElementRef<HTMLButtonElement>;
  @ViewChild('appsTab') appsTab!: ElementRef<HTMLButtonElement>;
  @ViewChild('gamesTab') gamesTab!: ElementRef<HTMLButtonElement>;
  @ViewChild('steamPanel') steamPanel!: ElementRef<HTMLDivElement>;
  @ViewChild('mobilePanel') mobilePanel!: ElementRef<HTMLDivElement>;
  @ViewChild('appsPanel') appsPanel!: ElementRef<HTMLDivElement>;
  @ViewChild('gamesPanel') gamesPanel!: ElementRef<HTMLDivElement>;

  // Estado de la interfaz
  activeCategory: 'steam' | 'playStore' | 'apps' | 'games' = 'steam';
  currentGameIndex = 0;
  currentAppIndex = 0; // Nuevo índice para apps
  private isAnimating = false;

  // Próximos lanzamientos de Steam (destacados)
  steamGames = [
    {
      title: 'Próximo Juego Steam #1',
      description: 'Descripción del primer juego que subirás a Steam. Una experiencia única que combina...',
      link: '#', // Aquí pondrás la URL de la web del juego
      status: 'Próximamente en Steam',
      featured: true
    },
    {
      title: 'Próximo Juego Steam #2', 
      description: 'Descripción del segundo juego. Una aventura innovadora que...',
      link: '#', // Aquí pondrás la URL de la web del juego
      status: 'En desarrollo',
      featured: true
    }
  ];

  // Juegos en Google Play (destacados)
  googlePlayGames = [
    {
      title: 'Pompita y su pajita',
      description: 'Juego de carreras desarrollado para la MálagaJam. ¡Ahora disponible en móviles con controles táctiles optimizados!',
      link: 'https://liyodev.itch.io/malagajam19', // Cambiar por enlace de Google Play cuando esté disponible
      itchLink: 'https://liyodev.itch.io/malagajam19',
      status: 'Disponible en itch.io',
      featured: true,
      type: 'Racing',
      rating: '4.8',
      downloads: '1K+'
    },
    {
      title: 'Capsule Chaos',
      description: 'Explora mazmorras procedurales en un emocionante multijugador online. Versión móvil con controles adaptados.',
      link: 'https://liyodev.itch.io/capsule-chaos', // Cambiar por enlace de Google Play cuando esté disponible
      itchLink: 'https://liyodev.itch.io/capsule-chaos',
      status: 'Disponible en itch.io',
      featured: true,
      type: 'Multiplayer',
      rating: '4.6',
      downloads: '500+'
    }
  ];

  // Aplicaciones y herramientas desarrolladas
  applications = [
    {
      title: 'Lanzador Microservicios',
      description: 'Herramienta para gestionar y lanzar múltiples microservicios de forma coordinada. Automatiza el proceso de desarrollo y despliegue.',
      link: 'https://github.com/liyo-dev/lanzador-microservicios',
      type: 'DevOps Tool',
      tech: ['Node.js', 'Docker', 'Microservices']
    },
    {
      title: 'Last Time Visit',
      description: 'Aplicación para rastrear y recordar la última vez que visitaste lugares importantes. Útil para seguimiento personal.',
      link: 'https://github.com/liyo-dev/last-time-visit',
      type: 'Personal Tool',
      tech: ['JavaScript', 'Local Storage', 'PWA']
    },
    {
      title: 'Pixel Wars',
      description: 'Juego de estrategia por turnos con gráficos pixelados. Combate táctico con mecánicas innovadoras.',
      link: 'https://github.com/liyo-dev/pixel-wars',
      type: 'Game',
      tech: ['Unity', 'C#', 'Pixel Art']
    },
    {
      title: 'Chat Application',
      description: 'Sistema de chat en tiempo real con múltiples salas y funcionalidades avanzadas de mensajería.',
      link: 'https://github.com/liyo-dev/chat',
      type: 'Web App',
      tech: ['Socket.io', 'Node.js', 'React']
    }
  ];

  // Datos de juegos publicados con año
  publishedGames = [
    {
      title: 'Alex´s Adventure',
      description: 'The Curse Of Eternal Night - Una aventura épica llena de misterios',
      link: 'https://nonamegamesmlg.itch.io/alexs-adventure-the-curse-of-eternal-night',
      type: 'Adventure',
      year: '2023'
    },
    {
      title: 'Run, Down, Run',
      description: 'Un juego de plataformas desafiante con mecánicas únicas',
      link: 'https://liyodev.itch.io/run-down-run',
      type: 'Platformer',
      year: '2023'
    },
    {
      title: 'Chickentive',
      description: 'Puzzle game desarrollado para la Universidad de Málaga',
      link: 'https://liyodev.itch.io/chickentive',
      type: 'Puzzle',
      year: '2022'
    },
    {
      title: 'Sincronizados',
      description: 'Puzzle cooperativo multijugador con mecánicas innovadoras',
      link: 'https://liyodev.itch.io/sincronizados',
      type: 'Co-op',
      year: '2022'
    },
    {
      title: 'Pablito plantó un Pinito',
      description: '¡Planta tu pinito en esta aventura de acción llena de humor!',
      link: 'https://liyodev.itch.io/pablitopinito',
      type: 'Action',
      year: '2022'
    },
    {
      title: 'Málaga RPG',
      description: 'Juego de aventuras desarrollado para la Game Jam 17',
      link: 'https://liyodev.itch.io/malaga-rpg',
      type: 'RPG',
      year: '2021'
    }
  ];

  ngAfterViewInit() {
    this.initializeInterface();
    this.animateTabsEntrance();
    
    // Listener para resize de ventana
    window.addEventListener('resize', () => {
      setTimeout(() => {
        this.updateTabIndicator();
      }, 100);
    });
  }

  // Inicialización de la interfaz (simplificada)
  private initializeInterface() {
    // Configurar indicador de tab inicial con delay para asegurar que los elementos estén renderizados
    setTimeout(() => {
      
      // Asegurar que el panel inicial esté visible
      const initialPanelClass = this.activeCategory === 'playStore' ? 'mobile' : this.activeCategory;
      const initialPanel = document.querySelector(`.${initialPanelClass}-panel`);
      if (initialPanel) {
        initialPanel.classList.add('active');
      }
      
      this.updateTabIndicator();
    }, 200);
  }

  // Animación básica de entrada de los tabs
  private animateTabsEntrance() {
    // Animación simple sin GSAP
    const tabs = document.querySelectorAll('.floating-tab');
    tabs.forEach((tab, index) => {
      (tab as HTMLElement).style.opacity = '1';
    });
  }

  // Cambiar categoría activa (simplificado)
  switchCategory(category: 'steam' | 'playStore' | 'apps' | 'games') {
    if (this.isAnimating || this.activeCategory === category) return;
    
    this.isAnimating = true;
    const previousCategory = this.activeCategory;
    
    // Mapear categoría a nombre de panel CSS
    const getPanelClass = (cat: string) => cat === 'playStore' ? 'mobile' : cat;
    const previousPanelClass = getPanelClass(previousCategory);
    const newPanelClass = getPanelClass(category);

    // Obtener elementos
    const previousPanel = document.querySelector(`.${previousPanelClass}-panel`);
    const newPanel = document.querySelector(`.${newPanelClass}-panel`);

    // Ocultar panel anterior
    if (previousPanel) {
      previousPanel.classList.remove('active');
    }
    
    // Cambiar la categoría
    this.activeCategory = category;
    
    // Actualizar indicador de tab
    this.updateTabIndicator();
    
    // Mostrar nuevo panel
    if (newPanel) {
      newPanel.classList.add('active');
    }

    // Terminar animación
    setTimeout(() => {
      this.isAnimating = false;
    }, 100);
  }

  // Actualizar posición del indicador de tab (simplificado)
  private updateTabIndicator() {
    
    if (!this.tabIndicator) {
      return;
    }

    // Calcular posición basada en el índice del tab
    const tabIndex = this.getTabIndex(this.activeCategory);
    
    // Para tabs verticales (desktop)
    if (window.innerWidth > 768) {
      // Cálculo: 8px padding inicial + (índice * (70px altura + 8px gap))
      const topPosition = 8 + (tabIndex * 78);
      
      // Movimiento simple sin animación
      this.tabIndicator.nativeElement.style.top = topPosition + 'px';
      this.tabIndicator.nativeElement.style.left = '8px';
      this.tabIndicator.nativeElement.style.width = '70px';
      this.tabIndicator.nativeElement.style.height = '70px';
    } else {
      // Para tabs horizontales (mobile)
      // Cálculo: 8px padding inicial + (índice * (60px ancho + 8px gap))
      const leftPosition = 8 + (tabIndex * 68);
      
      // Movimiento simple sin animación
      this.tabIndicator.nativeElement.style.left = leftPosition + 'px';
      this.tabIndicator.nativeElement.style.top = '8px';
      this.tabIndicator.nativeElement.style.width = '60px';
      this.tabIndicator.nativeElement.style.height = '60px';
    }
  }

  // Obtener índice del tab basado en la categoría
  private getTabIndex(category: string): number {
    switch (category) {
      case 'steam': return 0;
      case 'playStore': return 1;
      case 'apps': return 2;
      case 'games': return 3;
      default: return 0;
    }
  }

  // Obtener elemento del tab activo
  private getActiveTabElement(): HTMLElement | null {
    try {
      let element: HTMLElement | null = null;
      
      switch (this.activeCategory) {
        case 'steam': 
          element = this.steamTab?.nativeElement || null;
          break;
        case 'playStore': 
          element = this.mobileTab?.nativeElement || null;
          break;
        case 'apps': 
          element = this.appsTab?.nativeElement || null;
          break;
        case 'games': 
          element = this.gamesTab?.nativeElement || null;
          break;
        default: 
          return null;
      }
      
      return element;
    } catch (error) {
      return null;
    }
  }

  // Función simplificada - sin animaciones complejas
  private animateContentCards() {
    // Sin animaciones por ahora
  }

  // Función simplificada - sin animaciones complejas
  private animateContentCardsForPanel(category: string) {
    // Sin animaciones por ahora
  }

  // Navegar en el showcase de juegos (simplificado)
  navigateShowcase(direction: number) {
    const newIndex = this.currentGameIndex + direction;
    
    if (newIndex < 0 || newIndex >= this.publishedGames.length) return;
    
    this.currentGameIndex = newIndex;
    // Sin animaciones por ahora
  }

  // Navegar en el showcase de aplicaciones (simplificado)
  navigateAppsShowcase(direction: number) {
    const newIndex = this.currentAppIndex + direction;
    
    if (newIndex < 0 || newIndex >= this.applications.length) return;
    
    this.currentAppIndex = newIndex;
    // Sin animaciones por ahora
  }

  // Navegar a juego/proyecto
  navigateToGame(link: string) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }

  // Navegar a aplicación
  navigateToApp(link: string) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }
}
