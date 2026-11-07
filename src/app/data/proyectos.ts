// Juegos y proyectos que salen en la portada. Las descripciones están en las traducciones
// (portfolio.games.<clave>.description) y los géneros en web.games.genres.<clave>.

export interface Juego {
  clave: string;
  titulo: string;
  enlace: string;
  imagen: string;
  plataforma: 'itch.io' | 'Google Play';
  anio?: string;
  jam?: boolean;
}

export interface Herramienta {
  clave: string;
  titulo: string;
  enlace: string;
  tecnologias: string[];
}

/** Del más reciente al primero. Sin año cuando no lo tengo claro. */
export const JUEGOS: Juego[] = [
  { clave: 'maskProtocol', titulo: 'Mask Protocol', enlace: 'https://miiirhyme.itch.io/mask-protocol', imagen: 'assets/img/mask-protocol.png', plataforma: 'itch.io', anio: '2024' },
  { clave: 'samuelito', titulo: 'Samuelito', enlace: 'https://liyodev.itch.io/samuelito', imagen: 'assets/img/samuelito.png', plataforma: 'itch.io', anio: '2024' },
  { clave: 'pompita', titulo: 'Pompita y su pajita', enlace: 'https://play.google.com/store/apps/details?id=com.Liyodev.Pompita&hl=es', imagen: 'assets/img/pompita.jpg', plataforma: 'Google Play', jam: true },
  { clave: 'capsuleChaos', titulo: 'Capsule Chaos', enlace: 'https://play.google.com/store/apps/details?id=com.Liyodev.TinyBrawl', imagen: 'assets/img/capsuleChaos.jpg', plataforma: 'Google Play' },
  { clave: 'alexAdventure', titulo: 'Alex´s Adventure', enlace: 'https://nonamegamesmlg.itch.io/alexs-adventure-the-curse-of-eternal-night', imagen: 'assets/img/alexAdventure.png', plataforma: 'itch.io', anio: '2023' },
  { clave: 'runDownRun', titulo: 'Run, Down, Run', enlace: 'https://liyodev.itch.io/run-down-run', imagen: 'assets/img/runDownRun.png', plataforma: 'itch.io', anio: '2023' },
  { clave: 'chickentive', titulo: 'Chickentive', enlace: 'https://liyodev.itch.io/chickentive', imagen: 'assets/img/chickentive.png', plataforma: 'itch.io', anio: '2022' },
  { clave: 'sincronizados', titulo: 'Sincronizados', enlace: 'https://liyodev.itch.io/sincronizados', imagen: 'assets/img/sincronizados.png', plataforma: 'itch.io', anio: '2022', jam: true },
  { clave: 'pablitoPinito', titulo: 'Pablito plantó un Pinito', enlace: 'https://liyodev.itch.io/pablitopinito', imagen: 'assets/img/pablito.png', plataforma: 'itch.io', anio: '2022' },
  { clave: 'malagaRPG', titulo: 'Málaga RPG', enlace: 'https://liyodev.itch.io/malaga-rpg', imagen: 'assets/img/malagaRPG.png', plataforma: 'itch.io', anio: '2021', jam: true },
];

export const HERRAMIENTAS: Herramienta[] = [
  { clave: 'lanzadorMicroservicios', titulo: 'Lanzador Microservicios', enlace: 'https://github.com/liyo-dev/lanzador-microservicios', tecnologias: ['Electron', 'Angular', 'Node.js'] },
  { clave: 'pixelWars', titulo: 'Pixel Wars', enlace: 'https://github.com/liyo-dev/pixel-wars', tecnologias: ['React', 'Deno Fresh', 'WebSockets'] },
  { clave: 'chatApp', titulo: 'Chat', enlace: 'https://github.com/liyo-dev/chat', tecnologias: ['Express', 'Socket.io', 'Pug'] },
];

export const HABILIDADES = ['Unity', 'C#', 'Angular', 'React', 'TypeScript', 'Java', 'Spring Boot', 'Node.js', 'Kubernetes'];

export const REDES = [
  { nombre: 'itch.io', enlace: 'https://liyodev.itch.io/' },
  { nombre: 'GitHub', enlace: 'https://github.com/liyo-dev' },
  { nombre: 'LinkedIn', enlace: 'https://www.linkedin.com/in/liyodev' },
];

export const WEB_DEL_SENDERO = 'https://senderoestrellasweb.web.app/';
