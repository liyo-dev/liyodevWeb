import { Component, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { LanguageService } from '../services/language.service';
import { ContactComponent } from '../contact/contact.component';
import { LiyoHeroComponent } from './liyo-hero/liyo-hero.component';
import { HABILIDADES, HERRAMIENTAS, JUEGOS, WEB_DEL_SENDERO } from '../data/proyectos';
import { MINIJUEGO } from '../minijuego/minijuego.config';

/** La web entera en una página: portada, Sendero, juegos, otras cosas, sobre mí y contacto. */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, LiyoHeroComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  readonly juegos = JUEGOS;
  readonly herramientas = HERRAMIENTAS;
  readonly habilidades = HABILIDADES;
  readonly webDelSendero = WEB_DEL_SENDERO;
  readonly concursoActivo = MINIJUEGO.activo;

  constructor(private seoService: SeoService, public i18n: LanguageService) {
    effect(() => {
      this.i18n.lang();
      this.seoService.setPageSeo({
        title: this.i18n.t('seo.home.title'),
        description: this.i18n.t('seo.home.description'),
        keywords: this.i18n.t('seo.home.keywords'),
        image: 'https://liyodev.web.app/completo_icon-512x512.png',
      });
    });
  }
}
