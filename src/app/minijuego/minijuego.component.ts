import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { MINIJUEGO } from './minijuego.config';
import { FilaDelRanking, Partida, RankingService } from './ranking.service';

declare global {
  interface Window {
    createUnityInstance?: (canvas: HTMLCanvasElement, config: object, progreso?: (p: number) => void) => Promise<any>;
    senderoMinijuego?: { alEstarListo?: () => void; alTerminar?: (p: Partida) => void };
  }
}

type EstadoEnvio = 'nada' | 'enviando' | 'enviado' | 'error' | 'cerrado' | 'invalido';

/**
 * Página del concurso «Cruza el portal»: el juego de Unity (se carga solo al pulsar Jugar),
 * la cuenta atrás, el ranking y el formulario para guardar la puntuación.
 */
@Component({
  selector: 'app-minijuego',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './minijuego.component.html',
  styleUrl: './minijuego.component.css',
})
export class MinijuegoComponent implements OnInit, OnDestroy {
  @ViewChild('lienzo') private lienzo?: ElementRef<HTMLCanvasElement>;

  readonly cargando = signal(false);
  readonly progreso = signal(0);
  readonly jugando = signal(false);
  readonly errorDeCarga = signal(false);
  readonly ranking = signal<FilaDelRanking[]>([]);
  readonly rankingError = signal(false);
  readonly ultima = signal<Partida | null>(null);
  readonly cuentaAtras = signal('');
  readonly abierto = signal(true);

  apodo = '';
  email = '';
  aceptaBases = false;
  envio: EstadoEnvio = 'nada';

  readonly fin = new Date(MINIJUEGO.concurso.fin);
  private instancia: any;
  private reloj?: ReturnType<typeof setInterval>;

  constructor(public i18n: LanguageService, private rankingService: RankingService, private zone: NgZone) {}

  ngOnInit(): void {
    this.actualizarCuentaAtras();
    this.reloj = setInterval(() => this.actualizarCuentaAtras(), 1000);
    this.cargarRanking();
  }

  ngOnDestroy(): void {
    clearInterval(this.reloj);
    window.senderoMinijuego = undefined;
    this.instancia?.Quit?.();
  }

  async jugar(): Promise<void> {
    if (this.cargando() || this.jugando()) return;
    this.cargando.set(true);
    this.errorDeCarga.set(false);
    const { carpeta, nombreDelBuild: n } = MINIJUEGO;

    window.senderoMinijuego = {
      alEstarListo: () => this.instancia?.SendMessage('PuenteWeb', 'Configurar',
        JSON.stringify({ semilla: MINIJUEGO.concurso.semilla, idioma: this.i18n.lang() })),
      alTerminar: partida => this.zone.run(() => { this.ultima.set(partida); this.envio = 'nada'; }),
    };

    try {
      await this.cargarScript(`${carpeta}/Build/${n}.loader.js`);
      this.instancia = await window.createUnityInstance!(this.lienzo!.nativeElement, {
        dataUrl: `${carpeta}/Build/${n}.data.br`,
        frameworkUrl: `${carpeta}/Build/${n}.framework.js.br`,
        codeUrl: `${carpeta}/Build/${n}.wasm.br`,
        companyName: 'Liyodev',
        productName: 'Cruza el portal',
        productVersion: '1.0',
      }, p => this.zone.run(() => this.progreso.set(Math.round(p * 100))));
      this.jugando.set(true);
    } catch (e) {
      console.error('No se ha podido cargar el minijuego', e);
      this.errorDeCarga.set(true);
    } finally {
      this.cargando.set(false);
    }
  }

  async guardar(): Promise<void> {
    const partida = this.ultima();
    if (!partida || this.envio === 'enviando') return;
    const apodo = this.apodo.trim();
    const email = this.email.trim();
    if (apodo.length < 2 || apodo.length > 20 || !this.aceptaBases || (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      this.envio = 'invalido';
      return;
    }
    if (!this.abierto()) { this.envio = 'cerrado'; return; }
    this.envio = 'enviando';
    try {
      await this.rankingService.guardar(partida, apodo, email);
      this.envio = 'enviado';
      this.ultima.set(null);
      this.cargarRanking();
    } catch (e) {
      console.error(e);
      this.envio = 'error';
    }
  }

  private async cargarRanking(): Promise<void> {
    try {
      this.ranking.set(await this.rankingService.mejores(20));
      this.rankingError.set(false);
    } catch {
      this.rankingError.set(true);
    }
  }

  private actualizarCuentaAtras(): void {
    const ms = this.fin.getTime() - Date.now();
    this.abierto.set(ms > 0);
    if (ms <= 0) { this.cuentaAtras.set(''); return; }
    const s = Math.floor(ms / 1000);
    const d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), seg = s % 60;
    this.cuentaAtras.set(`${d}d ${String(h).padStart(2, '0')}h ${String(m).padStart(2, '0')}m ${String(seg).padStart(2, '0')}s`);
  }

  private cargarScript(src: string): Promise<void> {
    if (window.createUnityInstance) return Promise.resolve();
    return new Promise((ok, mal) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload = () => ok();
      s.onerror = () => mal(new Error('No se encuentra ' + src));
      document.body.appendChild(s);
    });
  }

  fechaFin(): string {
    return this.fin.toLocaleString(this.i18n.lang() === 'en' ? 'en-GB' : 'es-ES', { dateStyle: 'long', timeStyle: 'short' });
  }
}
