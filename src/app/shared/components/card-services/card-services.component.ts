import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../../models/service.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-services',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.css'
})
export class CardServicesComponent {
  @Input() service!: Service;
  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  serviceForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  constructor(private fb: FormBuilder) { }

  openEditModal(): void {
    this.serviceForm = this.fb.group({
      serviceName: [this.service.serviceName, Validators.required],
      description: [this.service.description],
      person: [this.service.person, Validators.required],
      apartment: [this.service.apartment, Validators.required]
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

  saveService(): void {
    if (this.serviceForm.valid) {
      console.log('Método de edição ainda não implementado. Dados enviados:', this.serviceForm.value);
      this.closeEditModal();
    }
  }

  deleteService(): void {
    console.log('Método de deleção ainda não implementado. ID do serviço a ser deletado:', this.service.id);
    this.closeDeleteModal();
  }

}
