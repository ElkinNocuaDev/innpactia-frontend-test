// src/app/navbar.component.ts
import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="bg-gray-800 text-white px-4 py-3 flex justify-between items-center shadow">
      <div class="flex gap-4">
        <a *ngIf="isLoggedIn()" routerLink="/clients" routerLinkActive="font-bold underline">Clientes</a>
        <a *ngIf="isLoggedIn()" routerLink="/phones" routerLinkActive="font-bold underline">Teléfonos</a>
        <a *ngIf="isLoggedIn()" routerLink="/repairs" routerLinkActive="font-bold underline">Reparaciones</a>
      </div>
      <div>
        <a *ngIf="!isLoggedIn()" routerLink="/login" routerLinkActive="font-bold underline">Login</a>
        <button *ngIf="isLoggedIn()" (click)="logout()" class="bg-red-600 px-3 py-1 rounded">
          Logout
        </button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  // usamos signal para reflejar cambios en tiempo real
  private loggedIn = signal(this.auth.isLoggedIn());

  constructor() {
    // efecto para reaccionar a cambios en localStorage (ej. login/logout)
    effect(() => {
      this.loggedIn.set(this.auth.isLoggedIn());
    });
  }

  isLoggedIn() {
    return this.loggedIn();
  }

  logout() {
    this.auth.logout();
    this.loggedIn.set(false);
    this.router.navigate(['/login']);
  }
}
