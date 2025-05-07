import { Routes } from '@angular/router';
import { LandingComponent } from './shared/landing/landing.component';
import { PetsComponent } from './shared/pets/pets.component';
import { ServicesComponent } from './shared/services/services.component';
import { ManagerComponent } from './shared/manager/manager.component';
import { ManagerLoginComponent } from './shared/manager-login/manager-login.component';

export const routes: Routes = [
    { path: 'pets', component: PetsComponent },
    { path: 'servicos', component: ServicesComponent },
    { path: 'sindico', component: ManagerComponent },
    { path: 'login', component: ManagerLoginComponent },
    { path: '**', component: LandingComponent },
];
