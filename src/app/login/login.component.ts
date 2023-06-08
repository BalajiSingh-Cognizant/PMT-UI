import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

import { LoginModel, AuthenticatedResponse } from './login.model';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  credentials: LoginModel = { username: '', password: '' };

  constructor(
    private router: Router,
    private http: HttpClient,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login = (form: NgForm) => {
    if (form.valid) {
      this.http
        .post<AuthenticatedResponse>(
          'https://authenticationapi20230609070054.azurewebsites.net/api/auth',
          this.credentials,
          {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
          }
        )
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem('jwt', token);
            this.invalidLogin = false;
            this.loginService.currentUser$.next(this.credentials);
            this.router.navigate(['/']);
          },
          error: (err: HttpErrorResponse) => (
            console.log(err), (this.invalidLogin = true)
          ),
        });
    }
  };
}
