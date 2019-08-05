import { Component, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { PreLiquidacion } from 'src/app/_models/Facturacion/preliquidacion';
import { AngularGridInstance, GridOption, Column, Formatters, Formatter, CaseType, OperatorType } from 'angular-slickgrid';
import Swal from 'sweetalert2';
import { AlertifyService } from 'src/app/_services/alertify.service';


const customEnableButtonFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  return '<span style="color:green">  S/. ' + value.toLocaleString('en-US', {minimumFractionDigits: 2}) + '</span>';
};


@Component({
  selector: 'app-pendientespreliquidacion',
  templateUrl: './pendientespreliquidacion.component.html',
  styleUrls: ['./pendientespreliquidacion.component.css']
})
export class PendientespreliquidacionComponent implements OnInit {
 

  columnDefinitions: Column[] = [];
  gridOptions: GridOption = {};
  dataset: any[] = [];

  angularGrid: AngularGridInstance;
  gridObj: any;
  dataViewObj: any;

  angularGridReady(angularGrid: AngularGridInstance) {
    this.angularGrid = angularGrid;
    this.gridObj = angularGrid.slickGrid;
    this.dataViewObj = angularGrid.dataView;
  }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = ['fechaIngreso','descripcionLarga', 'tarifa' ,'paletas' , 'posdia','estadiaTotal', 'estadiaUltima' , 'posTotal' , 'ingreso', 'salida'  ];
  
  listData: MatTableDataSource<PreLiquidacion>;
  public loading = false;
  ordenes: PreLiquidacion[] = [];
  model: any  = {};
  ClienteId: number ;
  
  clientes: Dropdownlist[] = [];
  EstadoId : number;
  context;

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(  private clienteService: ClienteService,
    private alertify: AlertifyService,
    private facturacionService: FacturacionService) { }

  ngOnInit() {
    this.columnDefinitions = [
      { id: 'FechaIngreso', name: 'Fecha Ingreso', field: 'fechaIngreso', sortable: true ,  filterable: true },
      //{ id: 'descripcionLarga', name: 'Duration (days)', field: 'descripcionLarga', sortable: true },
      { id: 'Tarifa', name: 'Tarifa', field: 'tarifa', sortable: true },
      { id: 'paletas', name: '# Pallets', field: 'paletas' },
      { id: 'posdia', name: 'Pos Dia', field: 'posdia' },
      { id: 'estadiaTotal', name: '# días', field: 'estadiaTotal' },
      { id: 'posTotal', name: 'POS Total', field: 'posTotal' },
      { id: 'ingreso', name: 'IN', field: 'ingreso' },
      { id: 'salida', name: 'OUT', field: 'salida' },
      { id: 'total', name: 'Total', formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 }, field: 'total', sortable: true }
    ];
    this.gridOptions = {
      enableGrouping: true,  
      enableAutoResize: true,       // true by default
      enableCellNavigation: true,
      autoHeight: false,
      enableFiltering: true,
      autoResize: {
        containerId: 'demo-container',
        sidePadding: 15
      },
      enablePagination: true,
      pagination: {
        pageSizes: [10, 15, 20, 25, 30, 40, 50, 75, 100],
        pageSize: 10,
        totalItems: 0
      },
      
     
    };

   

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
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
  }
  selection = new SelectionModel<PreLiquidacion>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: PreLiquidacion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.productoId + 1}`;
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
    this.facturacionService.getPendientesLiquidacion(this.model.PropietarioFiltroId).subscribe(list => {
      
      this.ClienteId = this.model.PropietarioFiltroId;

      this.ordenes = list;
            this.dataViewObj.setGrouping({
        getter: 'descripcionLarga',  
        formatter: (g) => {
          return `  ${g.value} <span style="color:green">(${g.count} items)</span>`;
        },
        aggregateCollapsed: false,  
        lazyTotalsCalculation: true
      });

      this.dataset = list;
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
  highlight(row){
   // this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row)
  }
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  generar(){
    if(this.ClienteId == undefined){
      this.alertify.success("Debe cargar un cliente.");
      return;
    }
    this.model.ClienteId = this.ClienteId;
    this.facturacionService.generar_preliquidacion(this.model).subscribe(resp => {
        console.log(resp);
    });


  }

}