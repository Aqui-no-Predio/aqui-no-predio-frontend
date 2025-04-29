import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../../models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-pets',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-pets.component.html',
  styleUrl: './card-pets.component.css'
})
export class CardPetsComponent {
  @Input() pet!: Pet;
  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  petForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  constructor(private fb: FormBuilder) { }

  getPetTypeClass(petType: String): string {
    switch (petType) {
      case 'Cachorro':
        return 'pet-image-dog';
      case 'Gato':
        return 'pet-image-cat';
      case 'Ave':
        return 'pet-image-bird';
      case 'Roedor':
        return 'pet-image-rodent';
      case 'Réptil':
        return 'pet-image-reptile';
      case 'Outro':
        return 'pet-image-other';
      default:
        return 'pet-image-other';
    }
  }
  openEditModal(): void {
    this.petForm = this.fb.group({
      petName: [this.pet.petName, Validators.required],
      petType: [this.pet.petType, Validators.required],
      characteristics: [this.pet.characteristics, Validators.required],
      person: [this.pet.person, Validators.required],
      apartment: [this.pet.apartment, Validators.required]
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

  savePet(): void {
    if (this.petForm.valid) {
      console.log('Método de edição ainda não implementado. Dados enviados:', this.petForm.value);
      this.closeEditModal();
    }
  }

  deletePet(): void {
    console.log('Método de deleção ainda não implementado. ID do pet a ser deletado:', this.pet.id);
    this.closeDeleteModal();
  }

}