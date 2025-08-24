import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
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
}
