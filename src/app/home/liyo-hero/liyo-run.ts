// Liyo Run: el minijuego del mando de la portada. Un Liyo en pixel art corre por el cielo,
// salta los bugs y coge estrellas. Todo se dibuja en un canvas pequeño (160×64) que la CSS
// escala con image-rendering: pixelated. La lógica va a 60 pasos por segundo fijos, sea cual
// sea la frecuencia de la pantalla.

export type EstadoRun = 'off' | 'ready' | 'run' | 'over';

/** Lo que el juego le pide a la portada (cara del muñeco, bocadillo, textos). */
export interface ContactoRun {
  animo(animo: 'idle' | 'play' | 'happy' | 'oops', ms?: number): void;
  decir(frase: 'start' | 'cheer' | 'oops'): void;
  pie(texto: 'playing' | 'record' | 'newRecord', puntos?: number): void;
  marcador(puntos: number, record: number): void;
  textoEnPantalla(clave: 'overlayStart' | 'overlayOver'): string;
}

const W = 160, H = 64, SUELO = 54, PASO_MS = 1000 / 60;
const CLAVE_RECORD = 'liyo-run-best';

const PAL: Record<string, string> = {
  H: '#2d1f18', S: '#f3c7a1', K: '#1f1d3d', B: '#1f74ff', V: '#9b45f5', J: '#2f3a66',
  W: '#ffffff', G: '#46c46e', g: '#2c8a4b', R: '#ff5c7a', Y: '#ffc85c',
};
// Sprites: un carácter = un píxel, «.» = transparente.
const LIYO = ['..H.H.H.', '.HHHHHH.', 'HHHHHHHH', '.SSSSSS.', '.SKSSKS.', '.SSSSSS.', '..BBBB..', '.BBBBVV.', 'S.BBVV.S', '..BVVV..', '..JJJJ..'];
const PIERNAS = [['..J..J..', '.WW..WW.'], ['..J.J...', '.WW.WW..'], ['...J.J..', '..WW.WW.']];
const BUG = [
  ['.K.....K.', '..K...K..', '.GGGGGGG.', 'GGWKGWKGG', 'gGGGGGGGg', 'K.K.K.K.K'],
  ['K.......K', '.K.....K.', '.GGGGGGG.', 'GGWKGWKGG', 'gGGGGGGGg', '.K.K.K.K.'],
];
const ESTRELLA = ['..Y..', '.YYY.', 'YYYYY', '.YYY.', '.Y.Y.'];

interface Caja { x: number; y: number; w: number; h: number; }
interface Cosa extends Caja { cogida?: boolean; }

export class LiyoRun {
  estado: EstadoRun = 'off';

  private readonly ctx: CanvasRenderingContext2D;
  private record = 0;
  private fondo = Array.from({ length: 28 }, () => ({ x: Math.random() * W, y: Math.random() * (SUELO - 20), grande: Math.random() < 0.3 }));

  private p = { x: 18, y: SUELO - 13, vy: 0, enSuelo: true };
  private bugs: Cosa[] = [];
  private estrellas: Cosa[] = [];
  private velocidad = 1.1;
  private distancia = 0;
  private puntos = 0;
  private extra = 0;
  private hito = 0;
  private t = 0;
  private siguienteBug = 70;
  private siguienteEstrella = 120;
  private ultimo = 0;
  private acumulado = 0;
  private frame = 0;

  constructor(private readonly canvas: HTMLCanvasElement, private readonly contacto: ContactoRun) {
    canvas.width = W;
    canvas.height = H;
    this.ctx = canvas.getContext('2d')!;
    try { this.record = Number(localStorage.getItem(CLAVE_RECORD)) || 0; } catch { /* sin almacenamiento */ }
  }

  /** Abre la consola en espera, sin empezar a correr. */
  preparar(): void {
    this.reiniciar();
    this.estado = 'ready';
    this.pintar();
  }

  /** Toque, clic o espacio: empieza, salta o vuelve a empezar. */
  saltar(): void {
    if (this.estado === 'ready' || this.estado === 'over') { this.empezar(); return; }
    if (this.estado !== 'run') return;
    if (this.p.enSuelo) { this.p.vy = -2.75; this.p.enSuelo = false; }
  }

  cerrar(): void {
    this.estado = 'off';
    cancelAnimationFrame(this.frame);
  }

  /** Si la pestaña se oculta en plena carrera, la partida termina (nada de correr a ciegas). */
  perderSiCorre(): void {
    if (this.estado === 'run') this.perder();
  }

  private reiniciar(): void {
    this.p = { x: 18, y: SUELO - 13, vy: 0, enSuelo: true };
    this.bugs = [];
    this.estrellas = [];
    this.velocidad = 1.1;
    this.distancia = 0;
    this.puntos = 0;
    this.extra = 0;
    this.hito = 0;
    this.t = 0;
    this.siguienteBug = 70;
    this.siguienteEstrella = 120;
  }

  private empezar(): void {
    this.reiniciar();
    this.estado = 'run';
    this.contacto.animo('play');
    this.contacto.pie('playing');
    this.ultimo = performance.now();
    this.acumulado = 0;
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(this.bucle);
  }

  private perder(): void {
    this.estado = 'over';
    cancelAnimationFrame(this.frame);
    this.contacto.animo('oops', 1600);
    this.contacto.decir('oops');
    if (this.puntos > this.record) {
      this.record = this.puntos;
      try { localStorage.setItem(CLAVE_RECORD, String(this.record)); } catch { /* sin almacenamiento */ }
      this.contacto.pie('newRecord', this.puntos);
    } else {
      this.contacto.pie('record', this.record);
    }
    this.pintar();
  }

  private readonly bucle = (ahora: number): void => {
    if (this.estado !== 'run') return;
    this.acumulado += Math.min(250, ahora - this.ultimo);
    this.ultimo = ahora;
    while (this.acumulado >= PASO_MS && this.estado === 'run') {
      this.paso();
      this.acumulado -= PASO_MS;
    }
    this.pintar();
    if (this.estado === 'run') this.frame = requestAnimationFrame(this.bucle);
  };

  private paso(): void {
    this.t++;
    this.distancia += this.velocidad;
    this.velocidad = Math.min(2.6, 1.1 + this.distancia / 1800);

    const p = this.p;
    p.vy += 0.16;
    p.y += p.vy;
    if (p.y >= SUELO - 13) { p.y = SUELO - 13; p.vy = 0; p.enSuelo = true; }

    if (--this.siguienteBug <= 0) {
      this.bugs.push({ x: W + 4, y: SUELO - 6, w: 9, h: 6 });
      this.siguienteBug = 60 + Math.random() * 70 - this.velocidad * 8;
    }
    if (--this.siguienteEstrella <= 0) {
      this.estrellas.push({ x: W + 4, y: SUELO - 26 - Math.random() * 8, w: 5, h: 5 });
      this.siguienteEstrella = 110 + Math.random() * 120;
    }
    for (const b of this.bugs) b.x -= this.velocidad;
    for (const s of this.estrellas) s.x -= this.velocidad;
    this.bugs = this.bugs.filter(b => b.x > -12);

    const yo: Caja = { x: p.x + 1, y: p.y + 1, w: 6, h: 11 };
    for (const s of this.estrellas) {
      if (!s.cogida && choca(yo, s)) { s.cogida = true; this.extra += 10; this.contacto.animo('happy', 600); }
    }
    this.estrellas = this.estrellas.filter(s => s.x > -8 && !s.cogida);
    for (const b of this.bugs) {
      if (choca(yo, { x: b.x + 1, y: b.y + 1, w: 7, h: 5 })) { this.perder(); return; }
    }

    this.puntos = Math.floor(this.distancia / 10) + this.extra;
    const hito = Math.floor(this.distancia / 1000);
    if (hito > this.hito) {
      this.hito = hito;
      this.contacto.decir('cheer');
      this.contacto.animo('happy', 700);
    }
  }

  private pintar(): void {
    const c = this.ctx;
    c.fillStyle = '#0f1433';
    c.fillRect(0, 0, W, H);
    for (const s of this.fondo) {
      c.fillStyle = s.grande ? '#ffc85c' : '#5a5f9a';
      c.fillRect(Math.round((s.x - (this.distancia * 0.15) % W + W) % W), s.y, 1, 1);
    }
    c.fillStyle = '#2a2d58';
    c.fillRect(0, SUELO, W, H - SUELO);
    c.fillStyle = '#3a3e75';
    for (let x = -(this.distancia % 12); x < W; x += 12) c.fillRect(Math.round(x), SUELO, 6, 1);

    for (const s of this.estrellas) this.sprite(ESTRELLA, s.x, s.y + Math.sin((this.t + s.x) / 8));
    for (const b of this.bugs) this.sprite(BUG[Math.floor(this.t / 8) % 2], b.x, b.y);
    this.sprite(LIYO, this.p.x, this.p.y);
    this.sprite(this.p.enSuelo ? PIERNAS[(Math.floor(this.t / 6) % 2) + 1] : PIERNAS[0], this.p.x, this.p.y + 11);

    this.contacto.marcador(this.puntos, this.record);
    if (this.estado === 'ready') this.velo(this.contacto.textoEnPantalla('overlayStart'));
    if (this.estado === 'over') this.velo(this.contacto.textoEnPantalla('overlayOver'));
  }

  private velo(texto: string): void {
    const c = this.ctx;
    c.fillStyle = 'rgba(15,20,51,.6)';
    c.fillRect(0, 0, W, H);
    c.fillStyle = '#ffc85c';
    c.font = 'bold 9px Fredoka, sans-serif';
    c.textAlign = 'center';
    c.fillText(texto, W / 2, 30);
  }

  private sprite(filas: string[], x: number, y: number): void {
    const c = this.ctx;
    for (let j = 0; j < filas.length; j++) {
      const fila = filas[j];
      for (let i = 0; i < fila.length; i++) {
        const k = fila[i];
        if (k === '.') continue;
        c.fillStyle = PAL[k];
        c.fillRect(Math.round(x) + i, Math.round(y) + j, 1, 1);
      }
    }
  }
}

function choca(a: Caja, b: Caja): boolean {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
