import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';

import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { DateAdapter, MAT_DATE_FORMATS, MatTableDataSource, MatSelect } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';
import { Router } from '@angular/router';
import { NgForm, FormControl } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';





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

export class NuevaordenreciboComponent implements OnInit,OnDestroy,AfterViewInit  {

  model: any = {};
  clientes: Dropdownlist[] = [];
  OrdenesDetalle: OrdenReciboDetalle[] = [];

  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
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

  constructor(private ordenReciboService: OrdenReciboService , 
    private clienteService: ClienteService,
     private router: Router
     , private alertify: AlertifyService ) { }

  ngOnInit() {
      this.clienteService.getAll().subscribe(resp => { 
        resp.forEach(element => {
          this.clientes.push({ val: element.id , viewValue: element.nombre});
        });
        this.filteredClientes.next(this.clientes.slice());
        this.ClientesFilterCtrl.valueChanges
        .pipe(takeUntil(this._onDestroy))
        .subscribe(() => {
              this.filterBanks();
            });
  
        }, error => {
        }, () => { 
      });
   }

ngAfterViewInit() {
    this.setInitialValue();
}
 ngOnDestroy() {
      this._onDestroy.next();
      this._onDestroy.complete();
  }
  

  protected setInitialValue() {
    this.filteredClientes
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelect.compareWith = (a: Dropdownlist, b: Dropdownlist) => a && b && a.val === b.val;
      });
  }
 
  protected filterBanks() {
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

  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    
    this.model.PropietarioId = this.clientes.filter(x => x.val == this.model.PropietarioControl.val)[0].val;
    this.model.Propietario = this.clientes.filter(x => x.val == this.model.PropietarioControl.val)[0].viewValue;
  
    this.ordenReciboService.registrar(this.model).subscribe(resp => { 
      this.model = resp;
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['/verordenrecibo',  this.model.id ]);
    });

  }
  

}
