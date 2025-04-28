import { Component, Input } from '@angular/core';
import { Service } from '../../../models/service.model';

@Component({
  selector: 'app-card-services',
  imports: [],
  templateUrl: './card-services.component.html',
  styleUrl: './card-services.component.css'
})
export class CardServicesComponent {
  @Input() service!: Service;
}
