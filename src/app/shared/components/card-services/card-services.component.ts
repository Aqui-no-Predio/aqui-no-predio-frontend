import { Component, Input, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Service } from '../../../models/service.model';
import { CommonModule } from '@angular/common';
import { ServiceService } from '../../../core/services/service/service.service';

@Component({
  selector: 'app-card-services',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.css'
})
export class CardServicesComponent {
  @Input() service!: Service;
  @Output() serviceDeleted = new EventEmitter<void>(); 
  @Output() serviceUpdated = new EventEmitter<void>(); 

  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  serviceForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  constructor(private fb: FormBuilder, private serviceService: ServiceService) { }

  openEditModal(): void {
    this.serviceForm = this.fb.group({
      id: [this.service.id], 
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
          const updatedService: Service = this.serviceForm.value;
          this.serviceService.updateService(updatedService).subscribe({
            next: (service) => {
              this.closeEditModal();
              this.serviceUpdated.emit(); 
            },
            error: (error) => {
              console.error('Erro ao atualizar service:', error);
            }
          });
        }
  }

  deleteService(): void {
    this.serviceService.deleteService(this.service.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.serviceDeleted.emit(); 
      },
      error: (error) => {
        console.error('Erro ao deletar service:', error);
      }
    });
  }

}
