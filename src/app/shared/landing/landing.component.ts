import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { PostsComponent } from "../posts/posts.component";

@Component({
  selector: 'app-landing',
  imports: [ RouterOutlet, RouterLink, RouterLinkActive, PostsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  
}