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
    <div class="auth-card">
  <h2>{{ isRegister ? 'Registro' : 'Login' }}</h2>

  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <div>
      <label>Email</label>
      <input type="email" formControlName="email" />
    </div>

    <div>
      <label>Contraseña</label>
      <input type="password" formControlName="password" />
    </div>

    <button type="submit" [disabled]="form.invalid">
      {{ isRegister ? 'Registrar' : 'Iniciar sesión' }}
    </button>
  </form>

  <p>
    {{ isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?' }}
    <a href="#" (click)="toggle()">
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
