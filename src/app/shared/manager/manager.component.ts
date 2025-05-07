import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PostsComponent } from "../posts/posts.component";
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostService } from '../../core/services/post/post.service';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-manager',
  imports: [ PostsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  isCreateModalOpen = false;

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  postForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder, private postService: PostService) {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );

    this.postForm = this.fb.group({
      postTitle: ['', Validators.required],
      postType: ['', Validators.required],
      description: [''],
      postDate: new Date
    })
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  showComponent: 'posts' | null = null;

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    document.body.classList.add('modal-open');
    console.log("abre modal")
  }

  onSubmit() {
      if (this.postForm.valid) {
        const newPost: Post = this.postForm.value;
        this.postService.createPost(newPost).subscribe({
          next: (createdPost) => {
            console.log('Post criado com sucesso:', createdPost);
            this.closeCreateModal();
          },
          error: (error) => {
            console.error('Erro ao criar post:', error);
          }
        });
      } else {
        this.postForm.markAllAsTouched();
      }
    }

    
  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }

}