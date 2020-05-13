import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatSelect } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { SelectItem } from 'primeng/components/common/selectitem';
import * as moment from 'moment';

@Component({
  selector: 'app-editarordenrecibo',
  templateUrl: './editarordenrecibo.component.html',
  styleUrls: ['./editarordenrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class EditarordenreciboComponent implements OnInit {
  es: any;
  model: any = {};
  clientes: SelectItem[] = [];
  OrdenesDetalle: OrdenReciboDetalle[] = [];
  almacenes: SelectItem[] = [];


  

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
     private router: Router,
     private generealService : GeneralService,
     private activatedRoute: ActivatedRoute
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
       this.model.Id = this.activatedRoute.snapshot.params["uid"];

      this.clienteService.getAllPropietarios('').subscribe(resp => { 
            resp.forEach(element => {
              this.clientes.push({ value: element.id , label: element.razonSocial});
            });
          }, error => {
        }, () => { 

          this.generealService.getAllAlmacenes().subscribe(resp=> {
            resp.forEach(element => {
              this.almacenes.push({ value: element.id ,  label : element.descripcion});
            });
      
          }, error => {
          }, () =>  { 

          this.ordenReciboService.obtenerOrden(  this.model.Id ).subscribe(resp=>
            { 
                 console.log(resp);
                 
                
                 this.model.FechaEsperada = new Date(resp.fechaEsperada).toLocaleString();
                 this.model.HoraEsperada = resp.horaEsperada;
                 this.model.guiaremision = resp.guiaRemision;
                 this.model.PropietarioId = resp.propietarioId;
                 this.model.AlmacenId = resp.almacenId;
                 
                 
            })
          });
        });

     



   }


  




  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }


      this.model.Propietario =   this.clientes.filter(x => x.value == this.model.PropietarioId)[0].label;


  
    this.ordenReciboService.actualizar(this.model).subscribe(resp => { 
      this.model = resp;
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/recibo/listaordenrecibo']);
    });

  }



}
