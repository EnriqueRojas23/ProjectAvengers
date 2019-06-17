import { Component, OnInit, ViewChild } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { takeUntil } from 'rxjs/operators';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { EditButtonRendererComponent } from 'src/app/pages/modal/Edit-button-renderer/Edit-button-renderer.component';

@Component({
  selector: 'app-listaordensalida',
  templateUrl: './listaordensalida.component.html',
  styleUrls: ['./listaordensalida.component.css']
})
export class ListaordensalidaComponent implements OnInit {

  title = 'app';
   gridApi;
   gridColumnApi;
   frameworkComponents;

  columnDefs = [
      {headerName: 'N° Orden', field: 'numOrden',sortable: true , filter: true},
      {headerName: 'Propietario', field: 'propietario', sortable: true , filter: true},
      {headerName: 'Estado', field: 'nombreEstado',sortable: true , filter: true},
      {
        headerName: "Child/Parent",
        field: "value",
        cellRenderer: "childMessageRenderer",
        colId: "params",
        width: 180
      }
  ];
  rowData: OrdenSalida[] ;
  // rowData = [
  //     { make: 'Toyota', model: 'Celica', price: 35000 },
  //     { make: 'Ford', model: 'Mondeo', price: 32000 },
  //     { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'numOrden' ,'propietario','nombreEstado','guiaRemision' ,'equipotransporte', 'placa','fechaRequerida','horaRequerida','fechaRegistro','actionsColumn' ];
  
  listData: MatTableDataSource<OrdenSalida>;
  public loading = false;
  ordenes: OrdenSalida[] = [];
  model: any  = {};
  
  clientes: Dropdownlist[] = [];
  EstadoId : number;
  context;
 

  intervalo: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
      {val: 21, viewValue: 'Creado'},
      {val: 22, viewValue: 'Planificado'},
      {val: 23, viewValue: 'Asignado'},
      {val: 24, viewValue: 'Despachado'},
    
  ];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  constructor(private ordensalidaService: OrdenSalidaService,
    private router: Router,
    private clienteService: ClienteService,
    private alertify: AlertifyService
    ) { 

      this.context = { componentParent: this };
      this.frameworkComponents = {
        childMessageRenderer: EditButtonRendererComponent
      };




    }

  ngOnInit() {
    this.clienteService.getAllPropietarios("").subscribe(resp => { 
      resp.forEach(element => {
        this.clientes.push({ val: element.id , viewValue: element.razonSocial});
      });
      this.filteredClientes.next(this.clientes.slice());
      this.ClientesFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
            this.filterBanks();
          });
          this.loading = false;


    });



    this.loading = true;
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 21;
    this.model.PropietarioFiltroId = 1;
    
    this.EstadoId =this.model.estadoIdfiltro;
    this.model.PropietarioId = this.model.PropietarioFiltroId;


  }
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
  }
  selection = new SelectionModel<OrdenRecibo>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: OrdenRecibo): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ordenReciboId + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
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
  ver(id){
    this.router.navigate(['/despacho/verordensalida',id]);
   }
   buscar(){
    this.ordensalidaService.getAllOrdenSalida(this.model).subscribe(list => {
      
      this.ordenes = list;
      this.rowData = list;
      console.log(this.rowData);
      this.loading = false;
      this.listData = new MatTableDataSource(this.ordenes);
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
   methodFromParent(cell) {
    alert("Parent Component Method from " + cell + "!");
  }
}
