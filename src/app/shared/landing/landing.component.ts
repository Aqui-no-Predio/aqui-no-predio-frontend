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
  allPosts: Post[] = POSTS;
  filteredPosts: Post[] = [...this.allPosts];
  activeTab: string = 'Todos';

  constructor() { }

  filterPosts(type: string): void {
    this.activeTab = type;

    if (type === 'Todos') {
      this.filteredPosts = [...this.allPosts];
    } else {
      this.filteredPosts = this.allPosts.filter(post => post.postType === type);
    }
  }
}