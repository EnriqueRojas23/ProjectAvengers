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
  public loading = false;
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) { }
  ngOnInit() {
    var rememberme =  localStorage.getItem('Name');
    this.model.recuerdame = true;
    this.model.username = rememberme;


  }
  login(form: NgForm) {
    this.loading = true;
    if (form.invalid) {
      return; 
    }
    this.authService.login(this.model).subscribe(resp => { 
      


    }, error => {
      
        if('Unauthorized' == error)
           this.alertify.error('usuario y/o contraseña incorrecta');
        else if('Bloqueado' == error)
           this.alertify.error('usuario bloqueado');
        else if('Eliminado' == error)
           this.alertify.error('usuario eliminado');
        else 
          this.alertify.error(error);

    }, () => { 
      this.router.navigate(['/dashboard']);
    });
  }



}
