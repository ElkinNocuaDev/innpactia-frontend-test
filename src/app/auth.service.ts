// src/app/auth.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterDto {
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:4000/api';

  /** POST /auth/register */
  register(payload: RegisterDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/register`, payload)
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  /** POST /auth/login */
  login(payload: LoginDto): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.baseUrl}/auth/login`, payload)
      .pipe(tap((res) => this.saveToken(res.token)));
  }

  /** Guardar token en localStorage */
  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  /** Obtener token actual */
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  /** Eliminar token al cerrar sesión */
  logout() {
    localStorage.removeItem('token');
  }

  /** Verificar si el usuario está autenticado */
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
