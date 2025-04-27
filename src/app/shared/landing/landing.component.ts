import { Component } from '@angular/core';
import { CardPostComponent } from "../components/card-post/card-post.component";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [CardPostComponent, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
