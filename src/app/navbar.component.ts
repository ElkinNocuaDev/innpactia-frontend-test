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
    <nav class="navbar">
  <div class="nav-links">
    <a *ngIf="isLoggedIn()" routerLink="/clients" routerLinkActive="active">Clientes</a>
    <a *ngIf="isLoggedIn()" routerLink="/phones" routerLinkActive="active">Teléfonos</a>
    <a *ngIf="isLoggedIn()" routerLink="/repairs" routerLinkActive="active">Reparaciones</a>
  </div>

  <div class="nav-actions">
    <a *ngIf="!isLoggedIn()" routerLink="/login" routerLinkActive="active">Login</a>
    <button *ngIf="isLoggedIn()" (click)="logout()" class="logout-btn">Logout</button>
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
