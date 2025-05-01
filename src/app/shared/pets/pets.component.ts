import { Component } from '@angular/core';
import { CardPetsComponent } from "../components/card-pets/card-pets.component";
import { CommonModule, NgFor } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { PETS } from '../../../assets/mocks/pet.mock';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-pets',
  imports: [CardPetsComponent, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {

  allPets: Pet[] = PETS;
  filteredPets: Pet[] = [...this.allPets]
  activeTab: string = 'Todos';
  isCreateModalOpen = false;
  petForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      characteristics: [''],
      person: ['', Validators.required],
      apartment: ['', Validators.required]
    });
  }

  filterPets(type: string): void {
    this.activeTab = type;

    if (type === 'Todos') {
      this.filteredPets = [...this.allPets];
    } else {
      this.filteredPets = this.allPets.filter(pet => pet.petType === type)
    }
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
    document.body.classList.add('modal-open');
  }

  onSubmit() {
    if (this.petForm.valid) {
      console.log('Formulário submetido:', this.petForm.value);
    } else {
      this.petForm.markAllAsTouched(); 
    }
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }

}
