import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { DateAdapter, MAT_DATE_FORMATS,  MatSelect } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/components/common/selectitem';





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

export class NuevaordenreciboComponent implements OnInit  {
  es: any;
  public loading = false;
  model: any = {};
  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  dateInicio: Date = new Date(Date.now()) ;
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
    private generealService : GeneralService,
     private router: Router
     , private alertify: AlertifyService ) { }

  ngOnInit() {
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }
     
      this.generealService.getAllAlmacenes().subscribe(resp=> {
        resp.forEach(element => {
          this.almacenes.push({ value: element.id ,  label : element.descripcion});
        });

        this.clienteService.getAllPropietarios('').subscribe(resp => { 
          resp.forEach(element => {
            this.clientes.push({ value: element.id , label: element.razonSocial});
          });
    
          }, error => {
          }, () => { 
        
            if(localStorage.getItem('PropietarioId') == "undefined" || localStorage.getItem('PropietarioId') == null ) {
              this.model.PropietarioId = 1;
          }
          else {
            this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'));
          }

          if(localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') == 'undefined') {
            this.model.AlmacenId = 1;
          }
          else {
              this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'));
          }

        });

      });

      
   
   }


  registrar(form: NgForm) {

    this.loading =  true;

    if (form.invalid) {
      return; 
    }
     this.model.Propietario = this.clientes.filter(x => x.value == this.model.PropietarioId)[0].label;
    this.ordenReciboService.registrar(this.model).subscribe(resp => { 
          this.model = resp;
        }, error => {
          this.alertify.error(error);
        }, () => { 
          this.loading =  true;
          this.alertify.success("Se registró correctamente.");
          this.router.navigate(['/recibo/verordenrecibo',  this.model.id ]);
    });

  }
  

}
