import { Component, Input } from '@angular/core'
import { Pet } from '../../../models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-pets',
  imports: [CommonModule],
  templateUrl: './card-pets.component.html',
  styleUrl: './card-pets.component.css'
})
export class CardPetsComponent {
  @Input() pet!: Pet;
  
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
}