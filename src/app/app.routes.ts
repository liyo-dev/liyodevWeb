import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

/** Las páginas antiguas ahora son secciones de la portada: sus direcciones llevan a su sección. */
const aSeccion = (seccion: string) => () => inject(Router).createUrlTree(['/'], { fragment: seccion });

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'portfolio', redirectTo: aSeccion('juegos') },
      { path: 'about', redirectTo: aSeccion('sobre-mi') },
      { path: 'contact', redirectTo: aSeccion('contacto') },
    ],
  },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '**', redirectTo: '' },
];
