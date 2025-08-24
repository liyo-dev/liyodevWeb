import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly baseTitle = 'Liyodev - Raúl Báez';
  private readonly baseDescription = 'Portfolio de Raúl Báez (Liyodev) - Fullstack Developer especializado en Angular, Unity y creación de videojuegos.';

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  updateTitle(pageTitle: string): void {
    this.title.setTitle(`${pageTitle} | ${this.baseTitle}`);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
  }): void {
    if (config.title) {
      this.meta.updateTag({ name: 'title', content: config.title });
      this.meta.updateTag({ property: 'og:title', content: config.title });
      this.meta.updateTag({ name: 'twitter:title', content: config.title });
    }

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
      this.meta.updateTag({ name: 'twitter:description', content: config.description });
    }

    if (config.keywords) {
      this.meta.updateTag({ name: 'keywords', content: config.keywords });
    }

    if (config.image) {
      this.meta.updateTag({ property: 'og:image', content: config.image });
      this.meta.updateTag({ name: 'twitter:image', content: config.image });
    }
  }

  setPageSeo(pageData: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
  }): void {
    this.updateTitle(pageData.title);
    this.updateMetaTags({
      title: `${pageData.title} | ${this.baseTitle}`,
      description: pageData.description,
      keywords: pageData.keywords,
      image: pageData.image
    });
  }
}
