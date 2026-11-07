import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { LanguageService } from '../services/language.service';

/** Marco de la web: menú encima, la página y el pie. */
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  constructor(public i18n: LanguageService) {}
}
