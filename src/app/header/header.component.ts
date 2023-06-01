import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isManager = false;
  subscription: Subscription;

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loginService.currentUser$.subscribe(
      (result: any) => {
        this.isManager = this.checkManager();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isUserAuthenticated = (): boolean => {
    let token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  };

  checkManager = (): boolean => {
    let token = localStorage.getItem('jwt');
    let jwtData = token!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    return decodedJwtData.Role === 'Manager';
  };

  logOut = () => {
    localStorage.removeItem('jwt');
    this.router.navigate(['/']);
  };

  login = () => {};
}
