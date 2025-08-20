// src/app/phones.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Phone {
  id: string;
  clientId: string;
  brand: string;
  model: string;
  imei?: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreatePhoneDto {
  clientId: string;
  brand: string;
  model: string;
  imei?: string;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class PhonesService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  /** GET /phones/{clientId} -> teléfonos de un cliente */
  getByClientId(clientId: string): Observable<Phone[]> {
    return this.http.get<Phone[]>(`${this.baseUrl}/phones/${clientId}`);
  }

  /** POST /phones -> crear nuevo teléfono */
  create(payload: CreatePhoneDto): Observable<Phone> {
    return this.http.post<Phone>(`${this.baseUrl}/phones`, payload);
  }
}
