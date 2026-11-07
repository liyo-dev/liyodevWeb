import { Component, AfterViewInit, OnInit, effect } from '@angular/core';
import gsap from 'gsap';
import { SeoService } from '../services/seo.service';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {

  constructor(private seoService: SeoService, public i18n: LanguageService) {
    effect(() => {
      this.i18n.lang();
      this.updateSeo();
    });
  }

  ngOnInit(): void {}

  private updateSeo(): void {
    this.seoService.setPageSeo({
      title: this.i18n.t('seo.about.title'),
      description: this.i18n.t('seo.about.description'),
      keywords: this.i18n.t('seo.about.keywords'),
      image: 'https://avatars.githubusercontent.com/u/77936857?s=400&u=a748a1ec6bc40e6ec277cb309ddfd85d7f4ff8cb&v=4'
    });
  }

  ngAfterViewInit(): void {
    this.animateAboutSection();
  }

  private animateAboutSection(): void {
    gsap.from('.about-section .page-header h2', { y: -50, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.profile-summary', { y: 18, opacity: 0, duration: 0.6, delay: 0.1, ease: 'power3.out' });
    gsap.from('.skill-category', { y: 32, opacity: 0, duration: 0.6, stagger: 0.12, delay: 0.2, ease: 'back.out(1.2)' });
    gsap.from('.skill-tag', { y: 6, opacity: 0, duration: 0.3, stagger: 0.03, delay: 0.5, ease: 'power2.out' });
  }
}
