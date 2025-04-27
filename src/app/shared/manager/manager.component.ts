import { Component } from '@angular/core';
import { ManagerLoginComponent } from "../components/manager-login/manager-login.component";
import { ManagerPostComponent } from "../components/manager-post/manager-post.component";

@Component({
  selector: 'app-manager',
  imports: [ManagerLoginComponent, ManagerPostComponent],
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent {

}
