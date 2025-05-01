import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../../core/services/access.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manager-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './manager-login.component.html',
  styleUrl: './manager-login.component.css'
})
export class ManagerLoginComponent {

  accessKey: string = '';
  errorMessage: string = '';

  private readonly TEMP_VALID_KEY = 'chave_temporaria123';

  constructor(private router: Router, private accessService: AccessService) { }

  login(): void {
    if (this.accessKey === this.TEMP_VALID_KEY) {
      console.log('Chave de acesso temporária válida.');
      this.errorMessage = '';
      this.accessService.setAccessGranted(true);

      const btn = document.getElementById('validateBtn');
      if (btn) {
        btn.classList.add('success');

        setTimeout(() => {
          btn.classList.remove('success');
        }, 3000);
      }

    } else {
      this.errorMessage = 'Chave de acesso inválida.';
      console.log('Chave de acesso temporária inválida.');
    }
  }
}
