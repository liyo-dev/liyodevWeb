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

  // Inicialización de la interfaz
  private initializeInterface() {
    // Configurar indicador de tab inicial con delay para asegurar que los elementos estén renderizados
    setTimeout(() => {
      console.log('Initializing tab indicator...', {
        activeCategory: this.activeCategory,
        steamTab: this.steamTab?.nativeElement,
        tabIndicator: this.tabIndicator?.nativeElement
      });
      
      // Asegurar que el panel inicial esté visible
      const initialPanelClass = this.activeCategory === 'playStore' ? 'mobile' : this.activeCategory;
      const initialPanel = document.querySelector(`.${initialPanelClass}-panel`);
      if (initialPanel) {
        initialPanel.classList.add('active');
        console.log('✅ Initial panel activated:', `.${initialPanelClass}-panel`);
      }
      
      this.updateTabIndicator();
      
      // Animar las cards del panel inicial después de un pequeño delay
      setTimeout(() => {
        this.animateContentCardsForPanel(this.activeCategory);
      }, 300);
    }, 200);
  }

  // Animación de entrada de los tabs
  private animateTabsEntrance() {
    gsap.fromTo('.tab-item', 
      {
        y: -50,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }
    );

    gsap.fromTo('.panel-header',
      {
        y: 30,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.3,
        ease: "power2.out"
      }
    );
  }

  // Cambiar categoría activa
  switchCategory(category: 'steam' | 'playStore' | 'apps' | 'games') {
    if (this.isAnimating || this.activeCategory === category) return;
    
    console.log('🎯 Switching category from', this.activeCategory, 'to', category);
    
    this.isAnimating = true;
    const previousCategory = this.activeCategory;
    
    // Mapear categoría a nombre de panel CSS
    const getPanelClass = (cat: string) => cat === 'playStore' ? 'mobile' : cat;
    const previousPanelClass = getPanelClass(previousCategory);
    const newPanelClass = getPanelClass(category);

    // Ocultar panel anterior inmediatamente
    const previousPanel = document.querySelector(`.${previousPanelClass}-panel`);
    if (previousPanel) {
      previousPanel.classList.remove('active');
    }

    // Cambiar la categoría
    this.activeCategory = category;
    console.log('✅ Category changed to:', this.activeCategory);
    
    // Actualizar indicador de tab
    this.updateTabIndicator();
    
    // Mostrar nuevo panel después de un breve delay
    setTimeout(() => {
      const newPanel = document.querySelector(`.${newPanelClass}-panel`);
      if (newPanel) {
        newPanel.classList.add('active');
        
        // Animar las cards del nuevo panel
        setTimeout(() => {
          this.animateContentCardsForPanel(category);
          this.isAnimating = false;
        }, 100);
      } else {
        console.log('❌ New panel not found:', `.${newPanelClass}-panel`);
        this.isAnimating = false;
      }
    }, 150);
  }

  // Actualizar posición del indicador de tab
  private updateTabIndicator() {
    console.log('🔄 UpdateTabIndicator called for category:', this.activeCategory);
    
    if (!this.tabIndicator) {
      console.log('❌ UpdateTabIndicator: Missing tabIndicator');
      return;
    }

    // Calcular posición basada en el índice del tab
    const tabIndex = this.getTabIndex(this.activeCategory);
    
    console.log('📏 Tab calculations:', {
      category: this.activeCategory,
      tabIndex,
      isDesktop: window.innerWidth > 768
    });

    // Para tabs verticales (desktop)
    if (window.innerWidth > 768) {
      // Cálculo: 8px padding inicial + (índice * (70px altura + 8px gap))
      const topPosition = 8 + (tabIndex * 78);
      console.log('💻 Desktop mode - moving to calculated top:', topPosition);
      
      gsap.to(this.tabIndicator.nativeElement, {
        top: topPosition + 'px',
        left: '8px',
        width: '70px',
        height: '70px',
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      // Para tabs horizontales (mobile)
      // Cálculo: 8px padding inicial + (índice * (60px ancho + 8px gap))
      const leftPosition = 8 + (tabIndex * 68);
      console.log('📱 Mobile mode - moving to calculated left:', leftPosition);
      
      gsap.to(this.tabIndicator.nativeElement, {
        left: leftPosition + 'px',
        top: '8px', // Centrado verticalmente
        width: '60px',
        height: '60px',
        duration: 0.4,
        ease: "power2.out"
      });
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
          console.log('❌ Unknown category:', this.activeCategory);
          return null;
      }
      
      console.log('🎯 Getting tab element for category:', this.activeCategory, {
        element: !!element,
        hasClass: element?.classList.contains('active'),
        offsetTop: element?.offsetTop,
        offsetLeft: element?.offsetLeft
      });
      
      return element;
    } catch (error) {
      console.error('❌ Error getting active tab element:', error);
      return null;
    }
  }

  // Animar tarjetas del contenido
  private animateContentCards() {
    const cards = document.querySelectorAll('.content-panel.active .content-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.4)"
      }
    );
  }

  // Animar tarjetas de un panel específico
  private animateContentCardsForPanel(category: string) {
    console.log('🎨 Animating cards for category:', category);
    
    // Para apps y games usar animación específica del showcase
    if (category === 'apps' || category === 'games') {
      const activeCard = document.querySelector(`.${category}-panel .showcase-card.active`);
      console.log('🎴 Showcase card found:', !!activeCard);
      if (activeCard) {
        gsap.fromTo(activeCard, {
          opacity: 0,
          scale: 0.9
        }, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          delay: 0.1
        });
      }
    } else {
      // Para steam y playStore usar animación de cards
      // Mapear categoría a nombre de panel CSS
      const panelClass = category === 'playStore' ? 'mobile' : category;
      const cards = document.querySelectorAll(`.${panelClass}-panel .content-card`);
      console.log('🎴 Content cards found:', cards.length, 'for panel:', `.${panelClass}-panel`);
      
      if (cards.length > 0) {
        gsap.fromTo(cards, {
          opacity: 0,
          y: 30,
          scale: 0.9
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.4)",
          delay: 0.1
        });
      }
    }
  }

  // Navegar en el showcase de juegos
  navigateShowcase(direction: number) {
    const newIndex = this.currentGameIndex + direction;
    
    if (newIndex < 0 || newIndex >= this.publishedGames.length) return;
    
    this.currentGameIndex = newIndex;
    
    // Animar transición
    gsap.to('.showcase-card.active', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo('.showcase-card.active', 
          {
            scale: 1.1,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.2)"
          }
        );
      }
    });
  }

  // Navegar en el showcase de aplicaciones
  navigateAppsShowcase(direction: number) {
    const newIndex = this.currentAppIndex + direction;
    
    if (newIndex < 0 || newIndex >= this.applications.length) return;
    
    this.currentAppIndex = newIndex;
    
    // Animar transición
    gsap.to('.app-showcase-card.active', {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        gsap.fromTo('.app-showcase-card.active', 
          {
            scale: 1.1,
            opacity: 0
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(1.2)"
          }
        );
      }
    });
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
