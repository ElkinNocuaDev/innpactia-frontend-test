// src/app/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-sm mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4">{{ isRegister ? 'Registro' : 'Login' }}</h2>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label>Email</label>
          <input type="email" formControlName="email" class="w-full border px-2 py-1 rounded" />
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password" formControlName="password" class="w-full border px-2 py-1 rounded" />
        </div>

        <button type="submit" [disabled]="form.invalid"
          class="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {{ isRegister ? 'Registrar' : 'Iniciar sesión' }}
        </button>
      </form>

      <p class="mt-4 text-sm text-center">
        {{ isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
        <a href="#" (click)="toggle()" class="text-blue-600 underline">
          {{ isRegister ? 'Inicia sesión' : 'Regístrate' }}
        </a>
      </p>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isRegister = false;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  toggle() {
    this.isRegister = !this.isRegister;
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { email, password } = this.form.value;

    const action = this.isRegister
      ? this.authService.register({ email: email!, password: password! })
      : this.authService.login({ email: email!, password: password! });

    action.subscribe({
      next: () => {
        this.router.navigate(['/clients']); // 🔐 Redirige tras login/registro
      },
      error: (err) => {
        alert('Error: ' + (err.error?.message || 'Intenta de nuevo'));
      }
    });
  }
}
