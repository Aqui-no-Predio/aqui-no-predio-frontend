import { Component, OnInit } from '@angular/core';
import { CardServicesComponent } from "../components/card-services/card-services.component";
import { CommonModule, NgFor } from '@angular/common';
import { Service } from '../../models/service.model';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../core/services/service/service.service';

@Component({
  selector: 'app-services',
  imports: [CardServicesComponent, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit{
  allServices: Service[] = [];
  isCreateModalOpen = false;
  serviceForm: FormGroup;

  constructor(private fb: FormBuilder, private serviceService: ServiceService) {
    this.serviceForm = this.fb.group({
      serviceName: ['', Validators.required],
      description: [''],
      person: ['', Validators.required],
      apartment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAllServices().subscribe({
      next: (data) => {
        this.allServices = data;
      },
      error: (error) => {
        console.error('Erro ao carregar services:', error);
      }
    });
  }

  openCreateModal(): void {
      this.serviceForm.reset(); 
      this.isCreateModalOpen = true;
      document.body.classList.add('modal-open');
    }
  
    onSubmit() {
      if (this.serviceForm.valid) {
        const newService: Service = this.serviceForm.value;
        this.serviceService.createService(newService).subscribe({
          next: (createdService) => {
            console.log('Service criado com sucesso:', createdService);
            this.closeCreateModal();
            this.loadServices(); 
          },
          error: (error) => {
            console.error('Erro ao criar service:', error);
          }
        });
      } else {
        this.serviceForm.markAllAsTouched();
      }
    }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }
}
