import { Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing.component';
import { PetsComponent } from './shared/pets/pets.component';
import { ServicesComponent } from './shared/services/services.component';

export const routes: Routes = [
    { path: 'pets', component: PetsComponent },
    { path: 'servicos', component: ServicesComponent },
    { path: '**', component: LandingComponent },
];
