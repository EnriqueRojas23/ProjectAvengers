import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/_services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  subtitulo: any;
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() {
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigate(['/login']);
   }
}
