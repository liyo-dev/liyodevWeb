import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';

const CLAVE_TEMA = 'liyodev-theme';

/** Menú superior: logo, secciones, idioma y tema claro/oscuro. */
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  constructor(public i18n: LanguageService) {}

  /** Alterna claro/oscuro partiendo de lo que se ve ahora (elección guardada o la del sistema). */
  cambiarTema(): void {
    const raiz = document.documentElement;
    const oscuro = raiz.dataset['theme']
      ? raiz.dataset['theme'] === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    const nuevo = oscuro ? 'light' : 'dark';
    raiz.dataset['theme'] = nuevo;
    try { localStorage.setItem(CLAVE_TEMA, nuevo); } catch { /* sin almacenamiento */ }
  }
}
