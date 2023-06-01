import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isManager = false;
  isLogedIn = false;
  subscription: Subscription;

  constructor(
    private jwtHelper: JwtHelperService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.subscription = this.loginService.currentUser$.subscribe(
      (result: any) => {
        this.isLogedIn = this.isUserAuthenticated();
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
}
