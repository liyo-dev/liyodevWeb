import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  menuOpen = false;

  menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Sobre mí' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/contact', label: 'Contacto' }
  ];

  constructor(private router: Router) {}

  isHomePage(): boolean {
    return this.router.url === '/';
  }
  
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
