import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

declare const App: any;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: []
})

export class PagesComponent implements OnInit   {
  title = 'CargaClic-SPA';
  jwtHelper =  new JwtHelperService();

  FabOptions = {
    buttons: [
      {
        icon: 'timeline'
      },
      {
        icon: 'view_headline'
      },
      {
        icon: 'room'
      },
      {
        icon: 'lightbulb_outline'
      },
      {
        icon: 'lock'
      }
    ]
  };
  constructor(private authService: AuthService) {
    App.init();
  }
  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.menu =   JSON.parse(localStorage.getItem('menu'));
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
