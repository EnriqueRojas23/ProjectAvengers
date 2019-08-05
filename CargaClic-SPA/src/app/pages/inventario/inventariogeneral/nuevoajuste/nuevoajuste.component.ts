import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';

@Component({
  selector: 'app-nuevoajuste',
  templateUrl: './nuevoajuste.component.html',
  styleUrls: ['./nuevoajuste.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevoajusteComponent implements OnInit {
  model: any = {};
  id : any;
  id2 : any;
  estadoInventario: Dropdownlist[] = [];
  
  public loading = false;

  constructor(
    private inventarioService: InventarioService,
    private generalService: GeneralService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertify: AlertifyService ) { 

      this.generalService.getAll(3).subscribe(resp=>
        {
          
          resp.forEach(element => {
            this.estadoInventario.push({
              val: element.id ,
              viewValue: element.nombreEstado
            })
          });
        });
    }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params["uid"];
    this.id2 = this.activatedRoute.snapshot.params["uid2"];
    this.inventarioService.get(this.id).subscribe( resp => {
      console.log(resp);
      this.model = resp;  
    }) 
  }
  actualizar(form: NgForm){
    if (form.invalid) {
      return; 
    }
    this.inventarioService.actualizar_inventario(this.model).subscribe(resp => { 
      this.model = resp;
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/inventario/ajusteinventariodetalle', this.id2]);
    });





  } 
  
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  regresar(){
    this.router.navigate(['/inventario/ajusteinventariodetalle', this.id2]);
  }

}
