import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { MainComponent } from './main/main.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SenderoComponent } from './games/sendero/sendero.component';

export const routes: Routes = [
    {
      path: '',
      component: MainComponent,
      children: [
        { path: '', component: HomeComponent },
        { path: 'about', component: AboutComponent },
        { path: 'portfolio', component: PortfolioComponent },
        { path: 'juegos/el-sendero-de-las-estrellas', component: SenderoComponent },
        { path: 'contact', component: ContactComponent },
      ]
    },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: '**', redirectTo: '' }
  ];
