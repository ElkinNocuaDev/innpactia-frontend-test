// src/app/clients.service.ts
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Client, CreateClientDto } from './models';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private api = inject(ApiService);

  getClients(): Observable<Client[]> {
    return this.api.get<Client[]>('/clients');
  }

  addClient(client: CreateClientDto): Observable<Client> {
    // Mapeamos camelCase → snake_case
    const payload = {
      full_name: client.fullName,
      email: client.email,
      phone: client.phone
    };

    return this.api.post<Client>('/clients', payload);
  }
}
