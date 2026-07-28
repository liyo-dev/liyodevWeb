import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

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
      title: 'Mask Protocol',
      description: 'Desde un laboratorio triste y abandonado, Unit-01 desciende por capas cada vez más inestables del complejo que lo creó. Al final, solo queda una decisión: morir o eliminar a su creador.',
      link: 'https://miiirhyme.itch.io/mask-protocol',
      type: 'Action, Puzzle',
      year: '2024',
      image: 'assets/img/mask-protocol.png'
    },
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
