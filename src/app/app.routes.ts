// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';
import { PhonesComponent } from './phones.component';
import { RepairsComponent } from './repairs.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login.component';

export const routes: Routes = [
  { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
  { path: 'phones', component: PhonesComponent, canActivate: [authGuard] },
  { path: 'repairs', component: RepairsComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'clients', pathMatch: 'full' }
];
