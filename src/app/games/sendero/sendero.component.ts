import { Component, OnInit, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-sendero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sendero.component.html',
  styleUrl: './sendero.component.css'
})
export class SenderoComponent implements OnInit {
  constructor(private seoService: SeoService, public i18n: LanguageService) {
    effect(() => {
      this.i18n.lang();
      this.updateSeo();
    });
  }

  ngOnInit(): void {}

  private updateSeo(): void {
    this.seoService.setPageSeo({
      title: this.i18n.t('seo.sendero.title'),
      description: this.i18n.t('seo.sendero.description'),
      keywords: this.i18n.t('seo.sendero.keywords'),
      image: 'https://liyodev.web.app/assets/img/sendero/sendero_portada.png'
    });
  }
}
