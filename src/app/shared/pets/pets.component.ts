import { Component } from '@angular/core';
import { CardPetsComponent } from "../components/card-pets/card-pets.component";
import { NgFor } from '@angular/common';
import { Pet } from '../../models/pet.model';
import { PETS } from '../../../assets/mocks/pet.mock';

@Component({
  selector: 'app-pets',
  imports: [CardPetsComponent, NgFor],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {
  allPets: Pet[] = PETS;
  filteredPets: Pet[] = [...this.allPets]
  activeTab: string = 'Todos';

  constructor() { }

  filterPets(type: string): void {
    this.activeTab = type;

    if (type === 'Todos') {
      this.filteredPets = [...this.allPets];
    } else {
      this.filteredPets = this.allPets.filter(pet => pet.petType === type)
    }
  }
}
