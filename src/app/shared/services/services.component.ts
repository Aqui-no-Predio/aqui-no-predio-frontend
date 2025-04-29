import { Component } from '@angular/core';
import { CardServicesComponent } from "../components/card-services/card-services.component";
import { NgFor } from '@angular/common';
import { Service } from '../../models/service.model';
import { SERVICES } from '../../../assets/mocks/service.mock';

@Component({
  selector: 'app-services',
  imports: [CardServicesComponent, NgFor],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  services: Service[] = SERVICES;

  constructor() { }

  addService() {
    console.log('Método de adicionar serviço ainda não implementado')
  }
}
