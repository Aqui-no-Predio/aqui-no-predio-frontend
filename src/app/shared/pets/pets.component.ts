import { Component, OnInit } from '@angular/core'; // Importe OnInit
import { CardPetsComponent } from "../components/card-pets/card-pets.component";
import { CommonModule, NgFor } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { PetService } from '../../core/services/pet/pet.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-pets',
  imports: [CardPetsComponent, NgFor, CommonModule, ReactiveFormsModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent implements OnInit { 

  allPets: Pet[] = []; 
  filteredPets: Pet[] = [];
  activeTab: string = 'Todos';
  isCreateModalOpen = false;
  petForm: FormGroup;

  constructor(private fb: FormBuilder, private petService: PetService) {
    this.petForm = this.fb.group({
      petName: ['', Validators.required],
      petType: ['', Validators.required],
      characteristics: [''],
      person: ['', Validators.required],
      apartment: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPets(); 
  }

  loadPets(): void {
    this.petService.getAllPets().subscribe({
      next: (data) => {
        this.allPets = data;
        this.filteredPets = [...this.allPets]; 
        this.filterPets(this.activeTab); 
      },
      error: (error) => {
        console.error('Erro ao carregar pets:', error);
      }
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
    this.petForm.reset(); 
    this.isCreateModalOpen = true;
    document.body.classList.add('modal-open');
  }

  onSubmit() {
    if (this.petForm.valid) {
      const newPet: Pet = this.petForm.value;
      this.petService.createPet(newPet).subscribe({
        next: (createdPet) => {
          console.log('Pet criado com sucesso:', createdPet);
          this.closeCreateModal();
          this.loadPets(); 
        },
        error: (error) => {
          console.error('Erro ao criar pet:', error);
        }
      });
    } else {
      this.petForm.markAllAsTouched();
    }
  }

  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    document.body.classList.remove('modal-open');
  }

}
