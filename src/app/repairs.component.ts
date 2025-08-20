// src/app/repairs.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairsService, Repair, CreateRepairDto } from './repairs.service';

@Component({
  selector: 'app-repairs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">Reparaciones</h2>

      <!-- Buscar reparaciones por phoneId -->
      <div class="flex gap-2 mb-4">
        <input [(ngModel)]="phoneId" placeholder="ID del teléfono"
          class="flex-1 border px-2 py-1 rounded" />
        <button (click)="loadRepairs()" class="bg-blue-600 text-white px-4 py-2 rounded">
          Buscar
        </button>
      </div>

      <!-- Lista de reparaciones -->
      <ul *ngIf="repairs.length > 0; else noRepairs" class="space-y-2 mb-6">
        <li *ngFor="let repair of repairs" class="border p-2 rounded">
          <strong>{{ repair.description }}</strong><br />
          <small>Estado: {{ repair.status }}</small>
        </li>
      </ul>

      <ng-template #noRepairs>
        <p class="text-gray-500">No hay reparaciones para este teléfono.</p>
      </ng-template>

      <!-- Formulario para nueva reparación -->
      <h3 class="text-lg font-semibold mt-6 mb-2">Nueva Reparación</h3>
      <form (ngSubmit)="addRepair()" #repairForm="ngForm" class="space-y-2">
        <input type="text" name="description" [(ngModel)]="newRepair.description"
          placeholder="Descripción" required class="w-full border px-2 py-1 rounded" />

        <select name="status" [(ngModel)]="newRepair.status" required
          class="w-full border px-2 py-1 rounded">
          <option value="pending">Pendiente</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completado</option>
        </select>

        <button type="submit" [disabled]="!phoneId || repairForm.invalid"
          class="bg-green-600 text-white px-4 py-2 rounded w-full">
          Agregar Reparación
        </button>
      </form>
    </div>
  `
})
export class RepairsComponent {
  private repairsService = inject(RepairsService);

  phoneId = '';
  repairs: Repair[] = [];

  newRepair: CreateRepairDto = {
    phoneId: '',
    description: '',
    status: 'pending'
  };

  loadRepairs() {
    if (!this.phoneId) return;

    this.repairsService.getByPhoneId(this.phoneId).subscribe({
      next: (data) => (this.repairs = data),
      error: (err) => alert('Error al cargar reparaciones: ' + (err.error?.message || 'Intenta de nuevo'))
    });
  }

  addRepair() {
    if (!this.phoneId || !this.newRepair.description) return;

    this.newRepair.phoneId = this.phoneId;

    this.repairsService.create(this.newRepair).subscribe({
      next: (repair) => {
        this.repairs.push(repair);
        this.newRepair = { phoneId: this.phoneId, description: '', status: 'pending' };
      },
      error: (err) => alert('Error al agregar reparación: ' + (err.error?.message || 'Intenta de nuevo'))
    });
  }
}
