import { Component } from '@angular/core';
import { ManagerLoginComponent } from "../components/manager-login/manager-login.component";
import { PostsComponent } from "../posts/posts.component";
import { ManagerPostComponent } from "../components/manager-post/manager-post.component";
import { Observable } from 'rxjs';
import { AccessService } from '../../core/services/access.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager',
  imports: [ManagerLoginComponent, PostsComponent, ManagerPostComponent, CommonModule],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {
  accessGranted$: Observable<boolean>;

  constructor(private accessService: AccessService) {
    this.accessGranted$ = this.accessService.accessGranted$;
  }

  showComponent: 'posts' | 'managerPost' | null = null;
}
