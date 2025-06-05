import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { MenuComponent } from "../menu/menu.component";


@Component({
  selector: 'app-main',
  imports: [RouterModule, MenuComponent, FooterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
