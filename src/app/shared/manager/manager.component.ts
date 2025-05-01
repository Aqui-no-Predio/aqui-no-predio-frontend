import { Component } from '@angular/core';
import { ManagerLoginComponent } from "../components/manager-login/manager-login.component";
import { PostsComponent } from "../posts/posts.component";

@Component({
  selector: 'app-manager',
  imports: [ManagerLoginComponent, PostsComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
