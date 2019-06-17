import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';



@Component({
  selector: 'app-listadodespacho',
  templateUrl: './listadodespacho.component.html',
  styleUrls: ['./listadodespacho.component.css']
})
export class ListadodespachoComponent implements OnInit {




  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [  'numOrden' ,'propietario','nombreEstado','guiaRemision' ,'equipotransporte', 'placa','fechaRequerida','horaRequerida','fechaRegistro','actionsColumn' ];
  
  listData: MatTableDataSource<OrdenSalida>;
  public loading = false;
  ordenes: OrdenSalida[] = [];

  ordenesaux: OrdenSalida[] = [];
  model: any  = {};


  clientes: Dropdownlist[] = [];
  EstadoId : number;

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
      {val: 21, viewValue: 'Planeado'},
      {val: 5, viewValue: 'Asignado'},
      {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Almacenado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();


  constructor() { }

  ngOnInit() {
  }
  selection = new SelectionModel<OrdenSalida>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
}
