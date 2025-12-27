import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import gsap from 'gsap';
import { SwipeIndicatorComponent } from './swipe-indicator.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [SwipeIndicatorComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit, AfterViewInit {
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
  isMobile = false;

  // Próximos lanzamientos de Steam (destacados)
  steamGames = [
    {
      title: 'El Sendero de las Estrellas',
      description: 'El Sendero de las Estrellas es una aventura de fantasía ambientada en un mundo fragmentado por un antiguo cataclismo mágico. Encarnas a Will, un joven que descubre un poder de luz desconocido cuando un demonio ataca su pueblo. Guiado por un enigmático viajero, te adentrarás en el Sendero de las Estrellas, una red de portales llenos de pruebas creados por los dioses. A lo largo del viaje recorrerás reinos marcados por la corrupción y el abuso de la magia, tomarás decisiones que pondrán a prueba tu carácter y descubrirás que no todo es lo que parece. Lo que empieza como una misión para "salvar al mundo" se convierte en una historia sobre la amistad, la culpa y el sacrificio. Cuando llegue el momento de pedir un deseo, tendrás que decidir qué vale más: el poder o la vida de quienes amas.',
      link: 'https://senderoestrellasweb.web.app/',
      status: 'En desarrollo',
      featured: true,
      image: 'assets/img/sendero/sendero_portada.png'
    }
  ];

  // Juegos en Google Play (destacados)
  googlePlayGames = [
    {
      title: 'Pompita y su pajita',
      description: 'Juego de carreras desarrollado para la MálagaJam. ¡Ahora disponible en móviles con controles táctiles optimizados!',
      link: 'https://play.google.com/store/apps/details?id=com.Liyodev.Pompita&hl=es',
      itchLink: 'https://play.google.com/store/apps/details?id=com.Liyodev.Pompita&hl=es',
      status: 'Disponible en Google Play',
      featured: true,
      type: 'Racing',
      rating: '4.8',
      downloads: '1K+',
      image: 'assets/img/pompita.jpg'
    },
    {
      title: 'Capsule Chaos',
      description: 'Prototipo de mazmorras procedurales multijugador online. Actualmente en fase de pruebas.',
      link: 'https://play.google.com/store/apps/details?id=com.Liyodev.TinyBrawl',
      itchLink: 'https://play.google.com/store/apps/details?id=com.Liyodev.TinyBrawl',
      status: 'En fase de pruebas',
      featured: true,
      type: 'Prototype',
      rating: 'Beta',
      downloads: 'Testing',
      image: 'assets/img/capsuleChaos.jpg'
    }
  ];

  // Aplicaciones y herramientas desarrolladas
  applications = [
    {
      title: 'Lanzador Microservicios',
      description: 'Aplicación de escritorio para lanzar y gestionar microservicios de Angular y Spring Boot sin necesidad de abrir una consola o un IDE. Pensada para facilitar el trabajo diario en entornos locales y mantener todos los servicios controlados desde una sola interfaz visual.',
      link: 'https://github.com/liyo-dev/lanzador-microservicios',
      type: 'DevOps Tool',
      tech: ['Node.js', 'Angular', 'Electron']
    },
    {
      title: 'Pixel Wars',
      description: 'Juego multijugador en tiempo real basado en una pizarra pixel donde puedes dibujar, borrar y pintar encima de otros jugadores. Cada jugador tiene colores y un lápiz para crear arte colaborativo o competitivo mientras otros están conectados.',
      link: 'https://github.com/liyo-dev/pixel-wars',
      demoLink: 'https://dapper-dingo-58.deno.dev/',
      type: 'Multiplayer Game',
      tech: ['React', 'Deno Fresh', 'WebSockets']
    },
    {
      title: 'Chat Application',
      description: 'Chat simple en tiempo real con una única sala donde los usuarios pueden comunicarse instantáneamente. Interfaz minimalista y funcional para conversaciones grupales.',
      link: 'https://github.com/liyo-dev/chat',
      demoLink: 'https://web-production-dce9.up.railway.app/',
      type: 'Web App',
      tech: ['JavaScript', 'Express', 'Socket.io', 'Pug']
    }
  ];

  // Datos de juegos publicados con año
  publishedGames = [
    {
      title: 'Alex´s Adventure',
      description: 'RPG de acción y aventuras en un mundo de fantasía.',
      link: 'https://nonamegamesmlg.itch.io/alexs-adventure-the-curse-of-eternal-night',
      type: 'Adventure',
      year: '2023',
      image: 'assets/img/alexAdventure.png'
    },
    {
      title: 'Samuelito',
      description: 'Defiende los dientes de Samuelito de las caries atacantes en este juego de acción.',
      link: 'https://liyodev.itch.io/samuelito',
      type: 'Action',
      year: '2024',
      image: 'assets/img/samuelito.png'
    },
    {
      title: 'Run, Down, Run',
      description: 'Un juego de plataformas creado durante mi aprendizaje de desarrollo de videojuegos.',
      link: 'https://liyodev.itch.io/run-down-run',
      type: 'Platformer',
      year: '2023',
      image: 'assets/img/runDownRun.png'
    },
    {
      title: 'Chickentive',
      description: 'Puzzle game desarrollado para la Universidad de Málaga.',
      link: 'https://liyodev.itch.io/chickentive',
      type: 'Puzzle',
      year: '2022',
      image: 'assets/img/chickentive.png'
    },
    {
      title: 'Sincronizados',
      description: 'Puzzle cooperativo multijugador creado en una Game Jam.',
      link: 'https://liyodev.itch.io/sincronizados',
      type: 'Co-op',
      year: '2022',
      image: 'assets/img/sincronizados.png'
    },
    {
      title: 'Pablito plantó un Pinito',
      description: '¡Planta tu pinito en esta aventura de acción llena de humor!',
      link: 'https://liyodev.itch.io/pablitopinito',
      type: 'Action',
      year: '2022',
      image: 'assets/img/pablito.png'
    },
    {
      title: 'Málaga RPG',
      description: 'Juego de aventuras desarrollado para la Game Jam 17.',
      link: 'https://liyodev.itch.io/malaga-rpg',
      type: 'RPG',
      year: '2021',
      image: 'assets/img/malagaRPG.png'
    }
  ];

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Portfolio',
      description: 'Descubre los proyectos de Raúl Báez (Liyodev): videojuegos para Steam y Google Play, aplicaciones web con Angular y Unity. Innovación en cada línea de código.',
      keywords: 'portfolio developer, proyectos Steam, juegos Google Play, aplicaciones Angular, Unity games, El Sendero de las Estrellas, videojuegos RPG',
      image: 'https://liyodev.web.app/completo_icon-512x512.png'
    });
  }

  ngAfterViewInit() {
    this.checkIfMobile();
    this.initializeInterface();
    this.animateTabsEntrance();
    this.ensureMobileMenuFixed();
    
    // Listener para resize de ventana
    window.addEventListener('resize', () => {
      this.checkIfMobile();
      this.ensureMobileMenuFixed();
      setTimeout(() => {
        this.updateTabIndicator();
      }, 100);
    });
  }

  private checkIfMobile() {
    this.isMobile = window.innerWidth <= 768;
  }

  private ensureMobileMenuFixed() {
    if (this.isMobile && this.tabsContainer) {
      const element = this.tabsContainer.nativeElement;
      element.style.position = 'fixed';
      element.style.bottom = '0px';
      element.style.left = '0px';
      element.style.right = '0px';
      element.style.top = 'auto';
      element.style.transform = 'none';
      element.style.zIndex = '9999';
    }
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
      // Para tabs horizontales (mobile) con justify-content: space-around
      const container = this.tabsContainer.nativeElement;
      const containerWidth = container.offsetWidth;
      const tabWidth = 60; // Ancho del tab
      const numTabs = 4; // Número total de tabs
      
      // Calcular el espacio disponible y la posición del tab
      const availableSpace = containerWidth - (numTabs * tabWidth);
      const spacing = availableSpace / (numTabs + 1); // space-around divide el espacio en n+1 partes
      
      // Calcular posición del centro del tab
      const leftPosition = spacing + (tabIndex * (tabWidth + spacing));
      
      // Movimiento simple sin animación
      this.tabIndicator.nativeElement.style.left = leftPosition + 'px';
      this.tabIndicator.nativeElement.style.top = '12px';
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
    console.log('=== NAVIGATION DEBUG ===');
    console.log('Navigating to:', link);
    console.log('Link type:', typeof link);
    console.log('Link valid:', link && link !== '#');
    console.log('Current game index:', this.currentGameIndex);
    console.log('=========================');
    
    if (link && link !== '#') {
      console.log('Opening URL:', link);
      window.open(link, '_blank');
    } else {
      console.log('Navigation cancelled - invalid link');
    }
  }

  // Función específica para Google Play
  navigateToGooglePlay(game: any, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Google Play navigation for:', game.title, 'Link:', game.link);
    this.navigateToGame(game.link);
  }

  // Función específica para solicitar ser tester
  requestTesterAccess(game: any, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    console.log('Tester request for:', game.title, 'Link:', game.link);
    this.navigateToGame(game.link);
  }

  // Navegar a aplicación
  navigateToApp(link: string) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }

  // Navegar a demo de aplicación
  navigateToDemo(link: string) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }
}
