import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterModule } from '@angular/router';
import { BannerGameComponent } from "../components/banner-game/banner-game.component";

@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, FooterComponent, BannerGameComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
