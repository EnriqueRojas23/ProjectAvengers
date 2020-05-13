import { Component, OnInit, ViewChild } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatSelect } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { FormControl, NgForm } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/components/common/selectitem';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-nuevaordensalida',
  templateUrl: './nuevaordensalida.component.html',
  styleUrls: ['./nuevaordensalida.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class NuevaordensalidaComponent implements OnInit {

  model: any = {};
  es: any;
  clientes: SelectItem[] = [];
  almacenes: SelectItem[] = [];
  propietarios: SelectItem[] = [];
  direcciones: SelectItem[] = [];

  dateInicio: Date = new Date(Date.now()) ;


  IdNuevaOrden = 0;
  
  date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: true
  }

  constructor(private clienteService: ClienteService,
    private ordenSalidaService: OrdenSalidaService,
    private alertify: AlertifyService ,
    private generealService : GeneralService,
    private router : Router
    ) { }

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




    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.propietarios.push({ value: element.id , label: element.razonSocial});
      });

      }, error => {
      }, () => { 

        if(localStorage.getItem('PropietarioId') == "undefined" || localStorage.getItem('PropietarioId') == null ) {
          this.model.PropietarioId = 1;
        }
        else {
          this.model.PropietarioId =  parseInt(localStorage.getItem('PropietarioId'));
        }

        if(localStorage.getItem('Estado') == null || localStorage.getItem('Estado') == 'undefined') {
           this.model.EstadoId = 131;
        }
        else {
            this.model.EstadoId = parseInt(localStorage.getItem('Estado'));
        }
        if(localStorage.getItem('AlmacenId') == null || localStorage.getItem('AlmacenId') == 'undefined') {
          this.model.AlmacenId = 1;
        }
        else {
            this.model.AlmacenId = parseInt(localStorage.getItem('AlmacenId'));
        }
        

        this.clienteService.getAllClientesxPropietarios(this.model.PropietarioId).subscribe(resp => { 
          resp.forEach(element => {
            this.clientes.push({ value: element.id , label: element.razonSocial});
          });
    
    
          }, error => {
          }, () => { 
        });
    });

  });


  }



  



  onChangePropietario(propietario) {
    console.log(propietario);

    this.clientes = [];

    this.clienteService.getAllClientesxPropietarios(propietario.value).subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ value: element.id , label: element.razonSocial});
      });


      }, error => {
      }, () => { 
    });
  }

  onChangeCliente(cliente){
    this.direcciones = [];

    this.clienteService.getAllDirecciones(cliente.value).subscribe(resp => { 
      resp.forEach(element => {
        this.direcciones.push({ value: element.iddireccion , label: element.direccion  + " [ " + element.departamento + " - " +  element.provincia + " - " + element.distrito +" ] "  });
      });


      }, error => {
      }, () => { 
    });
  }
  registrar(form: NgForm){
    

    // this.model.PropietarioId = this.model.PropietarioControl.val;
      
      this.model.Propietario = this.propietarios.filter(x => x.value == this.model.PropietarioId)[0].label;
    // this.model.ClienteId = this.model.ClienteControl.val;
    // this.model.IdDireccion = this.model.DireccionesControl.val;


    // this.model.PropietarioControl = '';
    // this.model.ClienteControl = '';
    // this.model.DireccionesControl = '';

    if (form.invalid) {
         return;
    }
    this.ordenSalidaService.RegistarOrdenSalida(this.model).subscribe(resp => 
      {
        this.model = resp;
        console.log(this.model);
      }, error => {
         this.alertify.error(error);
      }, () => { 
        this.alertify.success("Se registró correctamente.");
        this.router.navigate(['/picking/verordensalida',  this.model ]);
      });
    

  }

}
