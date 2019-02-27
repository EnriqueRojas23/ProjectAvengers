import { Component, OnInit } from '@angular/core';

import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/graficas1/datepicker.extend';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';




@Component({
  selector: 'app-nuevaordenrecibo',
  templateUrl: './nuevaordenrecibo.component.html',
  styleUrls: ['./nuevaordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})

export class NuevaordenreciboComponent implements OnInit {
  model: any = {};
  clientes: Dropdownlist[] = [];
  OrdenesDetalle: OrdenReciboDetalle[] = [];


  IdNuevaOrden = 0;
  
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
	}
  constructor(private ordenReciboService: OrdenReciboService , 
    private clienteService: ClienteService,
     private router: Router
     , private alertify: AlertifyService ) { }

  ngOnInit() {
    this.IdNuevaOrden = Date.now();

    // Listado detalle en localstorage
    // localStorage.setItem('menu', stringMenu);
    // localStorage.removeItem('Name');
    var detalles =  localStorage.getItem('DetalleOrdenes');
    this.clienteService.getAll().subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.nombre});
      });
      }, error => {
      }, () => { 
    });


  }


  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }

    this.model.Propietario = this.clientes.filter(x => x.val == this.model.PropietarioId)[0].viewValue;


    //this.alertify.success("Se registró correctamente.");
    this.ordenReciboService.registrar(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['/listausuarios']);
    });

  }
  
}
