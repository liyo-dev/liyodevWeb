import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.css'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  lastUpdated = '29/05/2024';
  contactEmail = 'luarbaz@gmail.com';
  developerName = 'liyodev';
  companyName = 'liyodev';
  responsibleName = 'Raúl Báez Amate';
  address = 'Pasaje Gladiolos, 37 Málaga';

  ngOnInit() {
    // Forzar scroll en el body cuando se carga el componente
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
  }

  ngOnDestroy() {
    // Restaurar el comportamiento original cuando se sale del componente
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }
}
