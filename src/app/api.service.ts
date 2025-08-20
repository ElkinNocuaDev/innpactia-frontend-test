// src/app/api.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:4000/api';
  private http = inject(HttpClient);

  get<T>(endpoint: string) {
    return this.http.get<T>(`${this.baseUrl}${endpoint}`);
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
  }
}
