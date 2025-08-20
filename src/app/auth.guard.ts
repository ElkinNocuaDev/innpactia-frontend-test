// src/app/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isLoggedIn()) {
    return true; // ✅ Usuario autenticado, puede entrar
  } else {
    router.navigate(['/login']); // 🚫 Redirige si no tiene token
    return false;
  }
};
