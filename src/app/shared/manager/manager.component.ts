import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ManagerLoginComponent } from "../components/manager-login/manager-login.component";
import { PostsComponent } from "../posts/posts.component";
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager',
  imports: [ManagerLoginComponent, PostsComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  accessGranted$: Observable<boolean>;
  isCreateModalOpen = false;

  constructor(private authService: AuthService) {
    this.accessGranted$ = this.authService.accessGranted$;
  }

  showComponent: 'posts' | null = null;

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    document.body.classList.add('modal-open');
    console.log("abre modal")
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }

}