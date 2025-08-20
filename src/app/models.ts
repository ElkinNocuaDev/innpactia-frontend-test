// src/app/models.ts
export interface User {
  id?: string;
  email: string;
  password: string;
}

export interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
}

// DTO para el formulario en Angular
export interface CreateClientDto {
  fullName: string;
  email: string;
  phone: string;
}

export interface Phone {
  id: string;
  clientId: string;
  brand: string;
  model: string;
}

export interface Repair {
  id: string;
  phoneId: string;
  description: string;
  status: string;
}
