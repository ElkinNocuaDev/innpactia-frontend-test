// src/app/phones.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhonesService, Phone } from './phones.service';

@Component({
  selector: 'app-phones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Teléfonos por Cliente</h2>

      <div class="flex gap-2 mb-4">
        <input [(ngModel)]="clientId" placeholder="ID del cliente"
          class="flex-1 border px-2 py-1 rounded" />
        <button (click)="loadPhones()" class="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>

      <ul *ngIf="phones.length > 0; else noData" class="space-y-2">
        <li *ngFor="let phone of phones" class="border p-2 rounded">
          <strong>{{ phone.brand }} {{ phone.model }}</strong><br />
          <small>IMEI: {{ phone.imei || 'N/A' }}</small>
        </li>
      </ul>

      <ng-template #noData>
        <p class="text-gray-500">No se encontraron teléfonos.</p>
      </ng-template>
    </div>
  `
})
export class PhonesComponent {
  private phonesService = inject(PhonesService);

  clientId = '';
  phones: Phone[] = [];

  loadPhones() {
    if (!this.clientId) return;

    this.phonesService.getByClientId(this.clientId).subscribe({
      next: (data) => (this.phones = data),
      error: (err) => alert('Error cargando teléfonos: ' + (err.error?.message || 'Intenta de nuevo'))
    });
  }
}
