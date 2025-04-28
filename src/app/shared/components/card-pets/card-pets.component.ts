import { Component, Input } from '@angular/core'
import { Pet } from '../../../models/pet.model';

@Component({
  selector: 'app-card-pets',
  imports: [],
  templateUrl: './card-pets.component.html',
  styleUrl: './card-pets.component.css'
})
export class CardPetsComponent {
  @Input() pet!: Pet;
}
