import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { MatFormField, MatSelect } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
declare var $: any;




@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  model: any = {}  ;
  

  constructor(private userService: UserService,
    private authService: AuthService, private router: Router, private alertify: AlertifyService ) {  }

  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    this.userService.registrar(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['/listausuarios']);
    });

  }
  ngOnInit() {
    $("html,body").animate({ scrollTop: 0 }, "slow");
  }
  cancel(){
    this.router.navigate(['/listausuarios']);
  }
  
}
