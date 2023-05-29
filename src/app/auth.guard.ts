import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';
import { LoginService } from './login/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard = () => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  // return loginService.currentUser$.pipe(
  // filter((currentUser) => currentUser !== undefined),
  // map((currentUser) => {
  //   if (!currentUser) {
  //     router.navigateByUrl('/');
  //     return false;
  //   }
  //   return true;
  // })

  return () => {
    const token = localStorage.getItem('jwt');
    if (token && jwtHelper.isTokenExpired(token)) {
      return true;
    }
    router.navigate(['login']);
    return false;
  };
  // );
};
