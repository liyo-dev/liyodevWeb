import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LanguageService } from '../services/language.service';

/** Marco de la web: menú encima, la página y el pie. */
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  /** La flecha de volver arriba sale cuando ya se ha bajado un poco más de una pantalla. */
  readonly verArriba = signal(false);

  constructor(public i18n: LanguageService) {}

  @HostListener('window:scroll')
  alDesplazar(): void {
    this.verArriba.set(window.scrollY > window.innerHeight * 0.8);
  }

  subir(): void {
    const suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: suave ? 'smooth' : 'auto' });
  }
}
