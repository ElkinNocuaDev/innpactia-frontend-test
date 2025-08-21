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
    <div class="phones-card">
  <h2>Teléfonos por Cliente</h2>

  <div class="phone-search">
    <input [(ngModel)]="clientId" placeholder="ID del cliente" />
    <button (click)="loadPhones()">Buscar</button>
  </div>

  <ul *ngIf="phones.length > 0; else noData" class="phone-list">
    <li *ngFor="let phone of phones" class="phone-item">
      <strong>{{ phone.brand }} {{ phone.model }}</strong>
      <span>IMEI: {{ phone.imei || 'N/A' }}</span>
    </li>
  </ul>

  <ng-template #noData>
    <p class="no-phones">No se encontraron teléfonos.</p>
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
