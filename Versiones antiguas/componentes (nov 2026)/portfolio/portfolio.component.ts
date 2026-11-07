import { Component, OnInit, effect } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent implements OnInit {

  // Próximos lanzamientos de Steam (destacados)
  steamGames = [
    {
      key: 'sendero',
      title: 'El Sendero de las Estrellas',
      link: 'https://senderoestrellasweb.web.app/',
      featured: true,
      image: 'assets/img/sendero/sendero_portada.png'
    }
  ];

  // Juegos en Google Play (destacados)
  googlePlayGames = [
    {
      key: 'pompita',
      title: 'Pompita y su pajita',
      link: 'https://play.google.com/store/apps/details?id=com.Liyodev.Pompita&hl=es',
      itchLink: 'https://play.google.com/store/apps/details?id=com.Liyodev.Pompita&hl=es',
      featured: true,
      type: 'Racing',
      rating: '4.8',
      downloads: '1K+',
      image: 'assets/img/pompita.jpg'
    },
    {
      key: 'capsuleChaos',
      title: 'Capsule Chaos',
      link: 'https://play.google.com/store/apps/details?id=com.Liyodev.TinyBrawl',
      itchLink: 'https://play.google.com/store/apps/details?id=com.Liyodev.TinyBrawl',
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
      key: 'lanzadorMicroservicios',
      title: 'Lanzador Microservicios',
      link: 'https://github.com/liyo-dev/lanzador-microservicios',
      type: 'DevOps Tool',
      tech: ['Node.js', 'Angular', 'Electron']
    },
    {
      key: 'pixelWars',
      title: 'Pixel Wars',
      link: 'https://github.com/liyo-dev/pixel-wars',
      demoLink: 'https://dapper-dingo-58.deno.dev/',
      type: 'Multiplayer Game',
      tech: ['React', 'Deno Fresh', 'WebSockets']
    },
    {
      key: 'chatApp',
      title: 'Chat Application',
      link: 'https://github.com/liyo-dev/chat',
      demoLink: 'https://web-production-dce9.up.railway.app/',
      type: 'Web App',
      tech: ['JavaScript', 'Express', 'Socket.io', 'Pug']
    }
  ];

  // Datos de juegos publicados con año
  publishedGames = [
    {
      key: 'maskProtocol',
      title: 'Mask Protocol',
      link: 'https://miiirhyme.itch.io/mask-protocol',
      type: 'Action, Puzzle',
      year: '2024',
      image: 'assets/img/mask-protocol.png'
    },
    {
      key: 'alexAdventure',
      title: 'Alex´s Adventure',
      link: 'https://nonamegamesmlg.itch.io/alexs-adventure-the-curse-of-eternal-night',
      type: 'Adventure',
      year: '2023',
      image: 'assets/img/alexAdventure.png'
    },
    {
      key: 'samuelito',
      title: 'Samuelito',
      link: 'https://liyodev.itch.io/samuelito',
      type: 'Action',
      year: '2024',
      image: 'assets/img/samuelito.png'
    },
    {
      key: 'runDownRun',
      title: 'Run, Down, Run',
      link: 'https://liyodev.itch.io/run-down-run',
      type: 'Platformer',
      year: '2023',
      image: 'assets/img/runDownRun.png'
    },
    {
      key: 'chickentive',
      title: 'Chickentive',
      link: 'https://liyodev.itch.io/chickentive',
      type: 'Puzzle',
      year: '2022',
      image: 'assets/img/chickentive.png'
    },
    {
      key: 'sincronizados',
      title: 'Sincronizados',
      link: 'https://liyodev.itch.io/sincronizados',
      type: 'Co-op',
      year: '2022',
      image: 'assets/img/sincronizados.png'
    },
    {
      key: 'pablitoPinito',
      title: 'Pablito plantó un Pinito',
      link: 'https://liyodev.itch.io/pablitopinito',
      type: 'Action',
      year: '2022',
      image: 'assets/img/pablito.png'
    },
    {
      key: 'malagaRPG',
      title: 'Málaga RPG',
      link: 'https://liyodev.itch.io/malaga-rpg',
      type: 'RPG',
      year: '2021',
      image: 'assets/img/malagaRPG.png'
    }
  ];

  constructor(private seoService: SeoService, public i18n: LanguageService) {
    effect(() => {
      this.i18n.lang();
      this.updateSeo();
    });
  }

  ngOnInit(): void {}

  private updateSeo(): void {
    this.seoService.setPageSeo({
      title: this.i18n.t('seo.portfolio.title'),
      description: this.i18n.t('seo.portfolio.description'),
      keywords: this.i18n.t('seo.portfolio.keywords'),
      image: 'https://liyodev.web.app/completo_icon-512x512.png'
    });
  }

  // Traducciones de los datos de los juegos/apps (clave dinámica según idioma)
  gameDescription(key: string): string {
    return this.i18n.t(`portfolio.games.${key}.description`);
  }

  gameStatus(key: string): string {
    return this.i18n.t(`portfolio.games.${key}.status`);
  }

  // Navegar a juego/proyecto
  navigateToGame(link: string) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }

  // Función específica para Google Play
  navigateToGooglePlay(game: any, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.navigateToGame(game.link);
  }

  // Función específica para solicitar ser tester
  requestTesterAccess(game: any, event?: Event) {
    event?.preventDefault();
    event?.stopPropagation();
    this.navigateToGame(game.link);
  }

  // Navegar a aplicación
  navigateToApp(link: string) {
    this.navigateToGame(link);
  }

  // Navegar a demo de aplicación
  navigateToDemo(link: string) {
    this.navigateToGame(link);
  }
}
