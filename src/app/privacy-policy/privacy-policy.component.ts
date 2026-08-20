import { Component, OnInit, OnDestroy, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  lastUpdated = '29/05/2024';
  contactEmail = 'luarbaz@gmail.com';
  developerName = 'liyodev';
  companyName = 'liyodev';
  responsibleName = 'Raúl Báez Amate';
  address = 'Pasaje Gladiolos, 37 Málaga';

  constructor(public i18n: LanguageService, private seoService: SeoService) {
    effect(() => {
      this.i18n.lang();
      this.seoService.updateTitle(this.i18n.t('privacyPolicy.title'));
    });
  }

  /** Traduce una clave y sustituye placeholders {{var}} por su valor. */
  tp(key: string, vars?: Record<string, string>): string {
    let text = this.i18n.t(key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(new RegExp(`{{${k}}}`, 'g'), v);
      }
    }
    return text;
  }

  ngOnInit() {
    // Forzar scroll en el body cuando se carga el componente
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  ngOnDestroy() {
    // Restaurar el comportamiento original cuando se sale del componente
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}
