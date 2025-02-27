import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {
  projects = [
    { title: 'Juego 1', description: 'Un juego de plataformas emocionante.', link: 'https://itch.io/juego1' },
    { title: 'Juego 2', description: 'Un juego de estrategia en tiempo real.', link: 'https://itch.io/juego2' },
    // Añade más proyectos aquí
  ];
}
