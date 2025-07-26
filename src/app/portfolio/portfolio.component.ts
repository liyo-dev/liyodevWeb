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
      title: 'Portfolio Generator',
      description: 'Herramienta para generar portfolios dinámicos con Angular. Automatiza la creación de sitios web profesionales.',
      link: 'https://github.com/liyodev', // Reemplazar con tu enlace real
      type: 'Web Tool',
      tech: ['Angular', 'TypeScript', 'SCSS']
    },
    {
      title: 'Game Analytics Dashboard',
      description: 'Dashboard para analizar métricas de juegos. Visualización de datos en tiempo real para desarrolladores.',
      link: 'https://github.com/liyodev', // Reemplazar con tu enlace real
      type: 'Analytics',
      tech: ['React', 'Chart.js', 'Node.js']
    },
    {
      title: 'Level Editor Tool',
      description: 'Editor de niveles visual para juegos 2D. Interfaz drag & drop con exportación a JSON.',
      link: 'https://github.com/liyodev', // Reemplazar con tu enlace real
      type: 'Game Dev Tool',
      tech: ['Unity', 'C#', 'JSON']
    },
    {
      title: 'Asset Manager',
      description: 'Gestor de assets para proyectos de juegos. Organización automática y optimización de recursos.',
      link: 'https://github.com/liyodev', // Reemplazar con tu enlace real
      type: 'Utility',
      tech: ['Python', 'SQLite', 'PyQt']
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
      this.updateTabIndicator();
      
      // Animar las cards del panel inicial después de un pequeño delay
      setTimeout(() => {
        this.animateContentCardsForPanel(this.activeCategory);
      }, 800);
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

    // Animar salida del contenido anterior
    gsap.to(`.${previousCategory}-panel`, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        // Cambiar la categoría después de que termine la animación de salida
        this.activeCategory = category;
        console.log('✅ Category changed to:', this.activeCategory);
        
        // Actualizar indicador de tab DESPUÉS del cambio
        this.updateTabIndicator();
        
        // Preparar el nuevo panel invisible con las cards sin animar
        gsap.set(`.${category}-panel`, {
          opacity: 0,
          y: -20
        });
        
        // Preparar las cards del nuevo panel sin animación
        gsap.set(`.${category}-panel .content-card`, {
          opacity: 0,
          y: 30,
          scale: 0.9
        });
        
        // Animar entrada del panel
        gsap.to(`.${category}-panel`, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            // Luego animar las cards con delay
            this.animateContentCardsForPanel(category);
            this.isAnimating = false;
          }
        });
      }
    });
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
    // Para apps y games usar animación específica del showcase
    if (category === 'apps' || category === 'games') {
      const activeCard = document.querySelector(`.${category}-panel .showcase-card.active`);
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
      // Para steam y mobile usar animación de cards
      const cards = document.querySelectorAll(`.${category}-panel .content-card`);
      
      gsap.to(cards, {
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
