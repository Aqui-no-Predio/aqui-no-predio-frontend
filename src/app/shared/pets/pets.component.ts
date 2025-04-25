import { Component } from '@angular/core';
import { CardPetsComponent } from "../components/card-pets/card-pets.component";

@Component({
  selector: 'app-pets',
  imports: [CardPetsComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})
export class PetsComponent {

}
