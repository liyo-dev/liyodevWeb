import { AfterViewInit, Component, ElementRef, HostListener, NgZone, OnDestroy, ViewChild } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { ContactoRun, LiyoRun } from './liyo-run';

type Animo = 'idle' | 'play' | 'happy' | 'oops';

/**
 * Liyo dibujado en su nube, con el mando que abre Liyo Run.
 * El muñeco cambia de cara (data-mood del SVG) y habla en un bocadillo según la partida.
 * El juego corre fuera de la zona de Angular y toca el DOM directamente: no hace falta
 * detección de cambios 60 veces por segundo para mover píxeles.
 */
@Component({
  selector: 'app-liyo-hero',
  standalone: true,
  templateUrl: './liyo-hero.component.html',
  styleUrl: './liyo-hero.component.css',
})
export class LiyoHeroComponent implements AfterViewInit, OnDestroy {
  @ViewChild('art', { static: true }) private art!: ElementRef<HTMLDivElement>;
  @ViewChild('liyo', { static: true }) private liyo!: ElementRef<SVGSVGElement>;
  @ViewChild('pad', { static: true }) private pad!: ElementRef<SVGGElement>;
  @ViewChild('botonA', { static: true }) private botonA!: ElementRef<SVGCircleElement>;
  @ViewChild('bocadillo', { static: true }) private bocadillo!: ElementRef<SVGTextElement>;
  @ViewChild('consola', { static: true }) private consola!: ElementRef<HTMLDivElement>;
  @ViewChild('lienzo', { static: true }) private lienzo!: ElementRef<HTMLCanvasElement>;
  @ViewChild('marcador', { static: true }) private marcador!: ElementRef<HTMLSpanElement>;
  @ViewChild('pie', { static: true }) private pie!: ElementRef<HTMLDivElement>;

  private juego?: LiyoRun;
  private temporizadorAnimo?: ReturnType<typeof setTimeout>;
  private temporizadorBocadillo?: ReturnType<typeof setTimeout>;
  private temporizadorBoton?: ReturnType<typeof setTimeout>;

  constructor(public i18n: LanguageService, private zone: NgZone) {}

  ngAfterViewInit(): void {
    const contacto: ContactoRun = {
      animo: (a, ms) => this.animo(a, ms),
      decir: frase => {
        if (frase === 'start') this.decir(this.i18n.t('web.runner.start'));
        if (frase === 'cheer') this.decir(this.azar('web.runner.cheers'), 1200);
        if (frase === 'oops') this.decir(this.azar('web.runner.oops'), 2200);
      },
      pie: (texto, puntos) => {
        const otra = this.i18n.t('web.runner.again');
        const t = this.pie.nativeElement;
        if (texto === 'playing') t.textContent = this.i18n.t('web.runner.footPlaying');
        if (texto === 'newRecord') t.textContent = `${this.i18n.t('web.runner.newRecord')} ${puntos} · ${otra}`;
        if (texto === 'record') t.textContent = `${this.i18n.t('web.runner.record')}: ${puntos} · ${otra}`;
      },
      marcador: (puntos, record) => {
        this.marcador.nativeElement.textContent = record
          ? `${puntos}  ·  ${this.i18n.t('web.runner.recordShort')} ${record}`
          : String(puntos);
      },
      textoEnPantalla: clave => this.i18n.t(`web.runner.${clave}`),
    };
    this.juego = new LiyoRun(this.lienzo.nativeElement, contacto);
  }

  ngOnDestroy(): void {
    this.juego?.cerrar();
    clearTimeout(this.temporizadorAnimo);
    clearTimeout(this.temporizadorBocadillo);
    clearTimeout(this.temporizadorBoton);
  }

  /** Clic en el mando o en «Toca el mando»: abre la consola, o salta si ya está abierta. */
  abrir(): void {
    if (!this.juego) return;
    this.pulsarMando();
    if (!this.consola.nativeElement.hidden) {
      this.zone.runOutsideAngular(() => this.juego!.saltar());
      return;
    }
    this.consola.nativeElement.hidden = false;
    this.art.nativeElement.classList.add('playing');
    this.animo('happy', 900);
    this.decir(this.i18n.t('web.runner.start'));
    this.pie.nativeElement.textContent = this.i18n.t('web.runner.footStart');
    this.juego.preparar();
  }

  cerrar(): void {
    this.juego?.cerrar();
    this.consola.nativeElement.hidden = true;
    this.art.nativeElement.classList.remove('playing');
    this.animo('idle');
  }

  tocarPantalla(e: PointerEvent): void {
    e.preventDefault();
    this.pulsarMando();
    this.zone.runOutsideAngular(() => this.juego?.saltar());
  }

  @HostListener('document:keydown', ['$event'])
  teclado(e: KeyboardEvent): void {
    if (!this.juego || this.consola.nativeElement.hidden) return;
    // Con el mando enfocado, Intro/espacio ya los gestiona su propio (keydown).
    if ((e.target as Element | null)?.closest?.('.pad')) return;
    if (e.key === ' ' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.pulsarMando();
      this.zone.runOutsideAngular(() => this.juego!.saltar());
    }
    if (e.key === 'Escape') this.cerrar();
  }

  @HostListener('document:visibilitychange')
  alCambiarVisibilidad(): void {
    if (document.hidden) this.juego?.perderSiCorre();
  }

  private animo(a: Animo, ms?: number): void {
    clearTimeout(this.temporizadorAnimo);
    this.liyo.nativeElement.dataset['mood'] = a;
    if (ms) {
      this.temporizadorAnimo = setTimeout(() => {
        this.liyo.nativeElement.dataset['mood'] = this.juego?.estado === 'run' ? 'play' : 'idle';
      }, ms);
    }
  }

  private decir(texto: string, ms = 1800): void {
    this.bocadillo.nativeElement.textContent = texto;
    this.art.nativeElement.classList.add('said');
    clearTimeout(this.temporizadorBocadillo);
    this.temporizadorBocadillo = setTimeout(() => this.art.nativeElement.classList.remove('said'), ms);
  }

  private pulsarMando(): void {
    this.pad.nativeElement.classList.add('press');
    this.botonA.nativeElement.classList.add('lit');
    clearTimeout(this.temporizadorBoton);
    this.temporizadorBoton = setTimeout(() => {
      this.pad.nativeElement.classList.remove('press');
      this.botonA.nativeElement.classList.remove('lit');
    }, 120);
  }

  private azar(clave: string): string {
    const frases = this.i18n.t(clave).split('|');
    return frases[Math.floor(Math.random() * frases.length)];
  }
}
