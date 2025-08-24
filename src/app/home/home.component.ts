import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

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

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'Inicio',
      description: 'Raúl Báez (Liyodev) - Fullstack Developer y creador de videojuegos. Portfolio con proyectos web profesionales y juegos únicos.',
      keywords: 'Liyodev, Raúl Báez, desarrollador fullstack, Angular developer, Unity developer, portfolio, inicio',
      image: 'https://liyodev.web.app/completo_icon-512x512.png'
    });
  }
}
