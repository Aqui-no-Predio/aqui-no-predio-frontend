import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Post } from '../../../models/post.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-card-post',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
  @Input() post!: Post;
  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  postForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService, private fb: FormBuilder) {
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
      console.log('Método de edição ainda não implementado. Dados enviados:', this.postForm.value);
      this.closeEditModal();
    }
  }

  deletePost(): void {
    console.log('Método de deleção ainda não implementado. ID do post a ser deletado:', this.post.id);
    this.closeDeleteModal();
  }

  dateFormatter(): string {
    const data = this.post.postDate;

    const OPTIONS: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    };

    const FORMATTEDDATE = data.toLocaleDateString('pt-BR', OPTIONS);

    return FORMATTEDDATE;
  }
}
