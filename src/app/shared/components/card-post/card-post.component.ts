import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../../core/services/post/post.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  selector: 'app-card-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
  @Input() post!: Post;
  @Output() postDeleted = new EventEmitter<void>();
  @Output() postUpdated = new EventEmitter<void>();

  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  postForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private fb: FormBuilder, private postService: PostService) {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (authenticated) => {
        this.isAuthenticated = authenticated;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  openEditModal(): void {
    this.postForm = this.fb.group({
      id: [this.post.id], 
      postTitle: [this.post.postTitle, Validators.required],
      postType: [this.post.postType, Validators.required],
      description: [this.post.description]
    });

    this.isEditModalOpen = true;
    document.body.classList.add('modal-open');
  }

  openDeleteModal(): void {
    this.isDeleteModalOpen = true;
    document.body.classList.add('modal-open');
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    document.body.classList.remove('modal-open');
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    document.body.classList.remove('modal-open');
  }

  savePost(): void {
    if (this.postForm.valid) {
      const updatedPost: Post = this.postForm.value;
      this.postService.updatePost(updatedPost, this.post.id).subscribe({
        next: (post) => {
          this.closeEditModal();
          this.postUpdated.emit();
        },
        error: (error) => {
          console.error('Erro ao atualizar post:', error);
        }
      });
    }
  }

  deletePost(): void {
    this.postService.deletePost(this.post.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.postDeleted.emit();
      },
      error: (error) => {
        console.error('Erro ao deletar post:', error);
      }
    });
  }

  dateFormatter(): string {
    const dataString = this.post.postDate; 
    const data = new Date(dataString); 
  
    if (isNaN(data.getTime())) {
      console.error('Data inválida recebida do backend:', dataString);
      return 'Data inválida'; 
    }
  
    const OPTIONS: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };
  
    const FORMATTEDDATE = data.toLocaleDateString('pt-BR', OPTIONS);
  
    return FORMATTEDDATE;
  }
  
}
