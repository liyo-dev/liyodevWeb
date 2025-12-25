import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-sendero',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sendero.component.html',
  styleUrl: './sendero.component.css'
})
export class SenderoComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setPageSeo({
      title: 'El Sendero de las Estrellas',
      description: 'Página oficial del juego El Sendero de las Estrellas. Aventura fantástica con lanzamiento previsto en Steam.',
      keywords: 'El Sendero de las Estrellas, Steam, RPG, aventura narrativa, videojuego',
      image: 'https://liyodev.web.app/assets/img/sendero/sendero_portada.png'
    });
  }
}
