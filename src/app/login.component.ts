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
    <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 font-sans">
  <div class="w-full max-w-md bg-white p-10 rounded-3xl shadow-2xl">
    <!-- Título -->
    <h2 class="text-3xl font-extrabold text-center text-gray-800 mb-8 tracking-tight">
      {{ isRegister ? 'Crear cuenta' : 'Bienvenido de nuevo' }}
    </h2>

    <!-- Formulario -->
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-6">
      <!-- Email -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
        <input
          type="email"
          formControlName="email"
          class="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          placeholder="tucorreo@ejemplo.com"
        />
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
        <input
          type="password"
          formControlName="password"
          class="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-800 shadow-sm 
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          placeholder="••••••••"
        />
      </div>

      <!-- Botón -->
      <button
        type="submit"
        [disabled]="form.invalid"
        class="w-full py-3 px-4 rounded-xl text-white font-semibold text-lg shadow-md 
               bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
               transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isRegister ? 'Registrarme' : 'Ingresar' }}
      </button>
    </form>

    <!-- Toggle -->
    <p class="mt-8 text-sm text-center text-gray-600">
      {{ isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
      <a
        href="#"
        (click)="toggle()"
        class="font-medium text-blue-600 hover:text-blue-800 transition-colors"
      >
        {{ isRegister ? 'Inicia sesión' : 'Regístrate' }}
      </a>
    </p>
  </div>
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
