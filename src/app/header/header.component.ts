import { JwtHelperService } from '@auth0/angular-jwt';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private jwtHelper: JwtHelperService) {}
  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem('jwt');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  };

  logOut = () => {
    localStorage.removeItem('jwt');
  };

  login = () => {};
}
