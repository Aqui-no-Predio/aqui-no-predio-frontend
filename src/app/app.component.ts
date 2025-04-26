import { Component } from '@angular/core';
import { LandingComponent } from "./shared/landing/landing.component";
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { PetsComponent } from "./shared/pets/pets.component";
import { ServicesComponent } from "./shared/services/services.component";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [LandingComponent, NavbarComponent, FooterComponent, PetsComponent, ServicesComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aqui-no-predio-frontend';
}
