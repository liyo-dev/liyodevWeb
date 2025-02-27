import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  socialLinks = [
    { url: 'https://github.com/tu-usuario', label: 'GitHub' },
    { url: 'https://linkedin.com/in/tu-usuario', label: 'LinkedIn' },
    { url: 'https://itch.io/tu-usuario', label: 'Itch.io' }
  ];
}
