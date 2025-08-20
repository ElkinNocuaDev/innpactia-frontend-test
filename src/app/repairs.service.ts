// src/app/repairs.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Repair {
  id: string;
  phoneId: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRepairDto {
  phoneId: string;
  description: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

@Injectable({ providedIn: 'root' })
export class RepairsService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  /** GET /repairs -> todas las reparaciones */
  getAll(): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repairs`);
  }

  /** GET /repairs/phone/{phoneId} -> reparaciones de un teléfono */
  getByPhoneId(phoneId: string): Observable<Repair[]> {
    return this.http.get<Repair[]>(`${this.baseUrl}/repairs/phone/${phoneId}`);
  }

  /** POST /repairs -> crear nueva reparación */
  create(payload: CreateRepairDto): Observable<Repair> {
    return this.http.post<Repair>(`${this.baseUrl}/repairs`, payload);
  }
}
