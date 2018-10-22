import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

declare const App: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})

export class PagesComponent implements OnInit {
  title = 'CargaClic-SPA';
  jwtHelper =  new JwtHelperService();
  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    App.init();
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
