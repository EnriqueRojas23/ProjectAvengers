import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { EquipoTransporte } from 'src/app/_models/Recepcion/equipotransporte';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listadoequipotransporte',
  templateUrl: './listadoequipotransporte.component.html',
  styleUrls: ['./listadoequipotransporte.component.css']
})
export class ListadoequipotransporteComponent implements OnInit {
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select','equipoTransporte', 'placa' ,'marca','estado' ,'tipoVehiculo', 'chofer','dni','actionsColumn' ];

  transportes: EquipoTransporte[] = [];

  public loading = false;
  listData: MatTableDataSource<EquipoTransporte>;
  clientes: Dropdownlist[] = [];
  model: any = {};

  selection = new SelectionModel<EquipoTransporte>(true, []);

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
    {val: 4, viewValue: 'Planeado'},
    {val: 5, viewValue: 'Asignado'},
    {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Terminado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.model.intervalo = 31;
    this.model.estadoIdfiltro = 12;
    this.model.PropietarioId = "1";

    this.ordenreciboService.getAllEquipoTransporte(this.model).subscribe(list => {
      this.transportes = list;
      this.loading = false;
      this.listData = new MatTableDataSource(this.transportes);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;


      } )


  }


  checkSelects() {
    
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: EquipoTransporte): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }    
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.transportes.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  openDoor(id){
    this.router.navigate(['/asignarpuerta',id]);
   }
   buscar(){
     
   }
}
