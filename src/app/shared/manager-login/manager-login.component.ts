import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-manager-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-login.component.html',
  styleUrl: './manager-login.component.css'
})
export class ManagerLoginComponent {

  accessKey: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  login(): void {
    this.errorMessage = '';

    this.authService.login(this.accessKey).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido.');
        const token = response.token;
        console.log('Token recebido:', token); 

        const btn = document.getElementById('validateBtn');
        if (btn) {
          btn.classList.add('success');
          setTimeout(() => {
            btn.classList.remove('success');
          }, 3000);
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erro na resposta de login:', error);
        this.errorMessage = error.error && typeof error.error === 'object' && error.error.message
          ? error.error.message
          : error.error || 'Chave de acesso inválida.';
        const btn = document.getElementById('validateBtn');
        if (btn) {
          btn.classList.add('error');
          setTimeout(() => {
            btn.classList.remove('error');
          }, 3000);
        }
      }
    });
  }
}
