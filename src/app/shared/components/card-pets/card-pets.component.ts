import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core'; // Importe Output e EventEmitter
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Pet } from '../../../models/pet.model';
import { CommonModule } from '@angular/common';
import { PetService } from '../../../core/services/pet/pet.service';

@Component({
  selector: 'app-card-pets',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-pets.component.html',
  styleUrl: './card-pets.component.css'
})
export class CardPetsComponent {
  @Input() pet!: Pet;
  @Output() petDeleted = new EventEmitter<void>(); 
  @Output() petUpdated = new EventEmitter<void>(); 

  @ViewChild('editModalElement') editModalElement!: ElementRef;
  @ViewChild('deleteModalElement') deleteModalElement!: ElementRef;

  petForm!: FormGroup;
  isEditModalOpen = false;
  isDeleteModalOpen = false;

  constructor(private fb: FormBuilder, private petService: PetService) { }

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
      id: [this.pet.id], 
      petName: [this.pet.petName, Validators.required],
      petType: [this.pet.petType, Validators.required],
      characteristics: [this.pet.characteristics],
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
      const updatedPet: Pet = this.petForm.value;
      this.petService.updatePet(updatedPet).subscribe({
        next: (pet) => {
          this.closeEditModal();
          this.petUpdated.emit(); 
        },
        error: (error) => {
          console.error('Erro ao atualizar pet:', error);
        }
      });
    }
  }

  deletePet(): void {
    this.petService.deletePet(this.pet.id).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.petDeleted.emit(); 
      },
      error: (error) => {
        console.error('Erro ao deletar pet:', error);
      }
    });
  }

}