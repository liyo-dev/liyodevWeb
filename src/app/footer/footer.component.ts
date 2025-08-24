import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  socialLinks = [
    { url: 'https://github.com/liyo-dev', label: 'GitHub' },
    { url: 'https://www.linkedin.com/in/liyodev', label: 'LinkedIn' },
    { url: 'https://liyodev.itch.io/', label: 'Itch.io' }
  ];
}
