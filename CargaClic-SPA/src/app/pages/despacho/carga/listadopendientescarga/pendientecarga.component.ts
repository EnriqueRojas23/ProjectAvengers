import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';
import { ShipmentLine } from 'src/app/_models/Despacho/shipmentline';



@Component({
  selector: 'app-pendientecarga',
  templateUrl: './pendientecarga.component.html',
  styleUrls: ['./pendientecarga.component.css']
})
export class PendienteCargaComponent implements OnInit {




  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select' , 'codigo' ,'producto','peso','unidadMedida' ,'fechaRequerida', 'horaRequerida','fechaRegistro' ];
  
  listData: MatTableDataSource<ShipmentLine>;
  public loading = false;
  lines: ShipmentLine[] = [];

  ordenesaux: ShipmentLine[] = [];
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


  constructor(private ordensalidaService: OrdenSalidaService
    ,  private alertify: AlertifyService ,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 30;
    this.model.PropietarioFiltroId = 1;
    
    
    this.EstadoId =this.model.estadoIdfiltro;
    this.model.PropietarioId = this.model.PropietarioFiltroId;

    
    this.model.PropietarioId = 1;
    this.model.EstadoId = 30;
    
    this.ordensalidaService.getAllPendienteCarga(this.model).subscribe(list => {
      
      this.lines = list;
      console.log(this.lines);
      this.loading = false;
      this.listData = new MatTableDataSource(this.lines);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;
      
        
      this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          
          if(ele != 'ubicacion' &&  ele != 'select' && ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
             {
               
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
             }
          })
         }
      });




  }
  selection = new SelectionModel<ShipmentLine>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: ShipmentLine): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id+ 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.lines.length;
    return numSelected === numRows;
  }
  masterToggle() {
    console.log('entre');
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  highlight(row){
    this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
  }
  agregar(){
     let ids = "";
       this.selection.selected.forEach(el => {
             ids = "," + el.id;
       });
        console.log(ids);
        this.model.ids = ids;
        this.model.UsuarioRegistroId = 1;
       this.ordensalidaService.registrar_carga(this.model).subscribe(resp => {

          

       });

  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
  buscar(){
    
  }
}
