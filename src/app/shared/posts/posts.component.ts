import { Component, OnInit } from '@angular/core';
import { CardPostComponent } from "../components/card-post/card-post.component";
import { NgFor } from '@angular/common';
import { Post } from '../../models/post.model';
import { PostService } from '../../core/services/post/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts',
  imports: [CardPostComponent, NgFor],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.css'
})
export class PostsComponent implements OnInit {
  allPosts: Post[] = [];
  filteredPosts: Post[] = [...this.allPosts];
  activeTab: string = 'Todos';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.allPosts = data;
        this.filteredPosts = [...this.allPosts];
        this.filterPosts(this.activeTab);
      },
      error: (error) => {
        console.error('Erro ao carregar posts:', error);
      }
    });
  }

  filterPosts(type: string): void {
    this.activeTab = type;

    if (type === 'Todos') {
      this.filteredPosts = [...this.allPosts];
    } else {
      this.filteredPosts = this.allPosts.filter(post => post.postType === type);
    }
  }
}
