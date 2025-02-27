import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
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
