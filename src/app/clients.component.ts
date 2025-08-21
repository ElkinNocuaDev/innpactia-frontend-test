// src/app/clients.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService } from './clients.service';
import { Client, CreateClientDto } from './models';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="clients-card">
  <h2>Clientes</h2>

  <!-- Formulario para agregar cliente -->
  <form (ngSubmit)="addClient()" #clientForm="ngForm" class="client-form">
    <input type="text" name="fullName" [(ngModel)]="newClient.fullName" placeholder="Nombre completo" required />
    <input type="email" name="email" [(ngModel)]="newClient.email" placeholder="Email" required />
    <input type="text" name="phone" [(ngModel)]="newClient.phone" placeholder="Teléfono" required />

    <button type="submit" [disabled]="clientForm.invalid">Agregar Cliente</button>
  </form>

  <!-- Lista de clientes -->
  <ul *ngIf="clients.length > 0; else noClients" class="client-list">
    <li *ngFor="let client of clients" class="client-item">
      <strong>{{ client.full_name }}</strong>
      <span>{{ client.email }}</span>
      <span>{{ client.phone }}</span>
    </li>
  </ul>

  <ng-template #noClients>
    <p class="no-clients">No hay clientes registrados.</p>
  </ng-template>
</div>

  `
})
export class ClientsComponent implements OnInit {
  private clientsService = inject(ClientsService);

  clients: Client[] = [];
  newClient: CreateClientDto = { fullName: '', email: '', phone: '' };

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getClients().subscribe({
      next: (data) => (this.clients = data),
      error: (err) =>
        alert('Error al cargar clientes: ' + (err.error?.message || 'Intenta de nuevo'))
    });
  }

  addClient() {
    if (!this.newClient.fullName || !this.newClient.email || !this.newClient.phone) return;

    this.clientsService.addClient(this.newClient).subscribe({
      next: (client) => {
        this.clients.push(client);
        this.newClient = { fullName: '', email: '', phone: '' }; // limpiar form
      },
      error: (err) =>
        alert('Error al agregar cliente: ' + (err.error?.message || 'Intenta de nuevo'))
    });
  }
}
