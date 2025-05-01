import { Component } from '@angular/core';
import { CardServicesComponent } from "../components/card-services/card-services.component";
import { CommonModule, NgFor } from '@angular/common';
import { Service } from '../../models/service.model';
import { SERVICES } from '../../../assets/mocks/service.mock';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-services',
  imports: [CardServicesComponent, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: Service[] = SERVICES;
  isCreateModalOpen = false;
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: [''],
      person: ['', Validators.required],
      apartment: ['', Validators.required]
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    document.body.classList.add('modal-open');
  }

  onSubmit() {
    if (this.serviceForm.valid) {
      console.log('Formulário submetido:', this.serviceForm.value);
    } else {
      this.serviceForm.markAllAsTouched();
    }
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }
}
