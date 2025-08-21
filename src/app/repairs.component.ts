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
    <div class="repairs-card">
  <h2>Reparaciones</h2>

  <!-- Buscar reparaciones -->
  <div class="repair-search">
    <input [(ngModel)]="phoneId" placeholder="ID del teléfono" />
    <button (click)="loadRepairs()">Buscar</button>
  </div>

  <!-- Lista de reparaciones -->
  <ul *ngIf="repairs.length > 0; else noRepairs" class="repair-list">
    <li *ngFor="let repair of repairs" class="repair-item">
      <strong>{{ repair.description }}</strong>
      <span class="status {{ repair.status }}">
        Estado: {{ repair.status }}
      </span>
    </li>
  </ul>

  <ng-template #noRepairs>
    <p class="no-repairs">No hay reparaciones para este teléfono.</p>
  </ng-template>

  <!-- Formulario -->
  <h3 class="form-title">Nueva Reparación</h3>
  <form (ngSubmit)="addRepair()" #repairForm="ngForm" class="repair-form">
    <input type="text" name="description" [(ngModel)]="newRepair.description"
      placeholder="Descripción" required />

    <select name="status" [(ngModel)]="newRepair.status" required>
      <option value="pending">Pendiente</option>
      <option value="in-progress">En progreso</option>
      <option value="completed">Completado</option>
    </select>

    <button type="submit" [disabled]="!phoneId || repairForm.invalid">
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
