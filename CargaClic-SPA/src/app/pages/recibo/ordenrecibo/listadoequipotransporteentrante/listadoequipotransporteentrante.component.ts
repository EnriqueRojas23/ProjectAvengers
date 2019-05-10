import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { EquipoTransporte } from 'src/app/_models/Recepcion/equipotransporte';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listadoequipotransporteentrante',
  templateUrl: './listadoequipotransporteentrante.component.html',
  styleUrls: ['./listadoequipotransporteentrante.component.css']
})
export class ListadoequipotransporteentranteComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'equipoTransporte', 'puerta' , 'placa' ,'marca','estado' ,'tipoVehiculo', 'chofer','dni','actionsColumn' ];
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
    {val: 131 , viewValue : "Llegada y Asignado" },
    {val: 13, viewValue: 'Llegada'},
    {val: 14, viewValue: 'Asignado'},
    {val: 15, viewValue: 'En Descarga'},
    {val: 16, viewValue: 'Cerrado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(private ordenreciboService: OrdenReciboService,
    private clienteService: ClienteService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;

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


    });




    this.model.intervalo = 31;
    this.model.estadoIdfiltro = 131;
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
    this.router.navigate(['recibo/asignarpuerta',id]);
   }
   openEquipoTransporte(id){
    this.router.navigate(['recibo/listaordenrecibida',id]);
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
  buscar(){

    this.ordenreciboService.getAllEquipoTransporte(this.model).subscribe(list => {
      

      this.transportes = list;
      this.loading = false;
      this.listData = new MatTableDataSource(this.transportes);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

  
     this.listData.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
            
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });
   }
}


