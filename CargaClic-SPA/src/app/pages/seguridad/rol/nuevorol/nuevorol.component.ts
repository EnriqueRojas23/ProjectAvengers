import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { NgForm } from '@angular/forms';
import { RolService } from 'src/app/_services/rol.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

export interface TipoRol {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-nuevorol',
  templateUrl: './nuevorol.component.html',
  styleUrls: ['./nuevorol.component.css']
})
export class NuevorolComponent implements OnInit {
  model: any = {}  ;


  tipos: Dropdownlist[] = [
    {val: 1, viewValue: 'Habilitado'},
    {val: 2, viewValue: 'Bloqueado'},
    {val: 3, viewValue: 'Eliminado'},
  ];



  constructor(private rolService:  RolService,
    private alertify: AlertifyService,
    private router: Router ) {

   }

  ngOnInit() {
  }
  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    this.rolService.saveRol(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['seguridad/listaroles']);
    });

  }
}
