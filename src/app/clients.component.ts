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
    <div class="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Clientes</h2>

      <!-- Formulario para agregar cliente -->
      <form (ngSubmit)="addClient()" #clientForm="ngForm" class="space-y-2 mb-6">
        <input type="text" name="fullName" [(ngModel)]="newClient.fullName" placeholder="Nombre completo"
          required class="w-full border px-2 py-1 rounded" />

        <input type="email" name="email" [(ngModel)]="newClient.email" placeholder="Email"
          required class="w-full border px-2 py-1 rounded" />

        <input type="text" name="phone" [(ngModel)]="newClient.phone" placeholder="Teléfono"
          required class="w-full border px-2 py-1 rounded" />

        <button type="submit" [disabled]="clientForm.invalid"
          class="bg-green-600 text-white px-4 py-2 rounded w-full">
          Agregar Cliente
        </button>
      </form>

      <!-- Lista de clientes -->
      <ul *ngIf="clients.length > 0; else noClients" class="space-y-2">
        <li *ngFor="let client of clients" class="border p-2 rounded">
          <strong>{{ client.full_name }}</strong><br />
          <small>{{ client.email }}</small><br />
          <small>{{ client.phone }}</small>
        </li>
      </ul>

      <ng-template #noClients>
        <p class="text-gray-500">No hay clientes registrados.</p>
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
