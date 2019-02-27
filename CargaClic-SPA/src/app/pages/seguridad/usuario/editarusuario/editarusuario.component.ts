import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms'; 
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { Dropdownlist } from 'src/app/_models/Constantes';


@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})


export class EditarusuarioComponent implements OnInit {
  model: any = {}  ;
  id: number;
  private sub: any;
  public selected2: any;
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
	}

  constructor(private userService: UserService,
    private authService: AuthService, private activatedRoute: ActivatedRoute,  private router: Router, private alertify: AlertifyService ) {  }

  tipos: Dropdownlist[] = [
    {val: 1, viewValue: 'Habilitado'},
    {val: 2, viewValue: 'Bloqueado'},
    {val: 3, viewValue: 'Eliminado'},
  ];

  ngOnInit() {

  

    this.id = this.sub = this.activatedRoute.snapshot.params["uid"];
     this.userService.getUser(this.id).subscribe(resp => { 
      this.model = resp;
      //this.selected2 = resp.estadoId ;
    }, error => {
       this.alertify.error(error);
    }, () => { 
        
    });
  }
  actualizar(form: NgForm){
     
    

    if (form.invalid) {
      return; 
    }
    this.userService.actualizar(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/listausuarios']);
    });
  }
    cancel(){
      this.router.navigate(['/listausuarios']);
    }

}
