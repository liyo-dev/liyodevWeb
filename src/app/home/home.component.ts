import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  socialLinks = [
    {
      url: 'https://github.com/tu-usuario',
      label: 'GitHub',
      icon: '/assets/icons/github.svg' 
    },
    {
      url: 'https://linkedin.com/in/tu-usuario',
      label: 'LinkedIn',
      icon: '/assets/icons/linkedin.svg' 
    },
    {
      url: 'https://itch.io/tu-usuario',
      label: 'Itch.io',
      icon: '/assets/icons/itchio.svg' 
    }
  ];
}
