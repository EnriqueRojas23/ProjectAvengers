import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from '../_services/alertify.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  model: any = {};
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  ngOnInit() {
  }
  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authService.login(this.model).subscribe(resp => {
    }, error => {
       this.alertify.error(error);
       console.log(error);
    }, () => {
      this.router.navigate(['/dashboard']);
    });
  }



}
