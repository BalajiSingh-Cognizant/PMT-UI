import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard = () => {
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  const token = localStorage.getItem('jwt');
  if (token && !jwtHelper.isTokenExpired(token)) {
    return true;
  }
  router.navigate(['login']);
  return false;
};
