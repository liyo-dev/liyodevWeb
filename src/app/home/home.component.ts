import { Component, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  socialLinks = [
    {
      url: 'https://github.com/liyo-dev',
      label: 'GitHub',
      icon: '/assets/icons/github.svg'
    },
    {
      url: 'https://www.linkedin.com/in/liyodev',
      label: 'LinkedIn',
      icon: '/assets/icons/linkedin.svg'
    },
    {
      url: 'https://liyodev.itch.io/',
      label: 'Itch.io',
      icon: '/assets/icons/itchio.svg'
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
      title: this.i18n.t('seo.home.title'),
      description: this.i18n.t('seo.home.description'),
      keywords: this.i18n.t('seo.home.keywords'),
      image: 'https://liyodev.web.app/completo_icon-512x512.png'
    });
  }
}
