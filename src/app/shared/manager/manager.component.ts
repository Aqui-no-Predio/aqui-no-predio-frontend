import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ManagerLoginComponent } from "../components/manager-login/manager-login.component";
import { PostsComponent } from "../posts/posts.component";
import { Subscription } from 'rxjs';
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
  isCreateModalOpen = false;

  isAuthenticated: boolean = false;
  private authSubscription: Subscription;

  constructor(private authService: AuthService) {
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