import { Component } from '@angular/core';
import { LandingComponent } from "./shared/landing/landing.component";
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [LandingComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'aqui-no-predio-frontend';
}
