import { Component } from '@angular/core';
import { CardPostComponent } from "../components/card-post/card-post.component";
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NgFor } from '@angular/common';
import { Post } from '../../models/post.model';
import { POSTS } from '../../../assets/mocks/post.mock';

@Component({
  selector: 'app-landing',
  imports: [CardPostComponent, RouterOutlet, RouterLink, RouterLinkActive, NgFor],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  posts: Post[] = POSTS;

  constructor() { }
}
