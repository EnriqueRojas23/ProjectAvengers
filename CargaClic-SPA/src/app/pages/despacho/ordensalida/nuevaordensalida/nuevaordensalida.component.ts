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
  
  clientes: Dropdownlist[] = [];
  propietarios: Dropdownlist[] = [];
  direcciones: Dropdownlist[] = [];

  

  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl(); 
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);



  public PropietariosCtrl: FormControl = new FormControl();
  public PropietariosFilterCtrl: FormControl = new FormControl(); 
  public filteredPropietarios: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);

  
  public DireccionesCtrl: FormControl = new FormControl();
  public DireccionesFilterCtrl: FormControl = new FormControl(); 
  public filteredDirecciones: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);



  @ViewChild('singleSelect') singleSelect: MatSelect;
  protected _onDestroy = new Subject<void>();

  

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
    private router : Router
    ) { }

  ngOnInit() {
    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.propietarios.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredPropietarios.next(this.propietarios.slice());
      this.PropietariosFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterPropietarios();
          });

      }, error => {
      }, () => { 
    });


  }
  protected filterPropietarios() {
    if (!this.propietarios) {
      return;
    }
    let search = this.PropietariosFilterCtrl.value;
    if (!search) {
      this.filteredPropietarios.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredPropietarios.next(
      this.propietarios.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterClientes() {
    if (!this.clientes) {
      return;
    }
    let search = this.ClientesFilterCtrl.value;
    if (!search) {
      this.filteredClientes.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredClientes.next(
      this.clientes.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }
  
  protected filterDirecciones() {
    if (!this.direcciones) {
      return;
    }
    let search = this.DireccionesFilterCtrl.value;
    if (!search) {
      this.filteredDirecciones.next(this.clientes.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredDirecciones.next(
      this.direcciones.filter(bank => bank.viewValue.toLowerCase().indexOf(search) > -1)
    );
  }


  onChangeDepartamento(propietario) {
    this.clientes = [];

    this.clienteService.getAllClientesxPropietarios(propietario.value.val).subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterClientes();
          });

      }, error => {
      }, () => { 
    });
  }

  onChangeCliente(cliente){
    this.direcciones = [];

    this.clienteService.getAllDirecciones(cliente.value.val).subscribe(resp => { 
      resp.forEach(element => {
        this.direcciones.push({ val: element.iddireccion , viewValue: element.direccion  + " [ " + element.departamento + " - " +  element.provincia + " - " + element.distrito +" ] "  });
      });
      this.filteredDirecciones.next(this.direcciones.slice());
      this.DireccionesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterClientes();
          });

      }, error => {
      }, () => { 
    });
  }
  registrar(form: NgForm){
    

    this.model.PropietarioId = this.model.PropietarioControl.val;
    this.model.Propietario = this.model.PropietarioControl.viewValue;
    this.model.ClienteId = this.model.ClienteControl.val;
    this.model.IdDireccion = this.model.DireccionesControl.val;


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
