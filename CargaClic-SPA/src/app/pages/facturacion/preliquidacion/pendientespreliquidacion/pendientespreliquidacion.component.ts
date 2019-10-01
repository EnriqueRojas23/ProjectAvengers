import { Component, OnInit, ViewChild } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { FormControl } from '@angular/forms';
import { MatSort, MatPaginator, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { PreLiquidacion } from 'src/app/_models/Facturacion/preliquidacion';
import { AngularGridInstance, GridOption, Column, Formatters, Formatter, CaseType, OperatorType } from 'angular-slickgrid';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';

import * as moment from 'moment';
const customEnableButtonFormatter: Formatter = (row: number, cell: number, value: any, columnDef: Column, dataContext: any, grid: any) => {
  return '<span style="color:green">  S/. ' + value.toLocaleString('en-US', {minimumFractionDigits: 2}) + '</span>';
};


@Component({
  selector: 'app-pendientespreliquidacion',
  templateUrl: './pendientespreliquidacion.component.html',
  styleUrls: ['./pendientespreliquidacion.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
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
      { id: 'id', name: 'Id', field: 'id', sortable: true ,  filterable: true },
      { id: 'producto', name: 'Producto ', field: 'producto', sortable: true },
      { id: 'Pallets', name: 'Paletas', field: 'pallets' },
      { id: 'posTotal', name: 'POS Total', field: 'posTotal' ,formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 }, },

//      { id: 'Tarifa', name: 'Tarifa', field: 'tarifa',formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 }, sortable: true },
      // { id: 'posdia', name: 'Pos Dia', field: 'posdia' ,formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 },},
      { id: 'ingreso', name: 'IN', field: 'in',formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 } ,},
      { id: 'salida', name: 'OUT', field: 'out' ,formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 },},
      { id: 'seguro', name: 'Seguro', field: 'seguro' ,formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 },},
      { id: 'cantidad', name: 'Cantidad', field: 'cantidad' },
      
      { id: 'total', name: 'Total', formatter: customEnableButtonFormatter,params: { minDecimalPlaces: 2, maxDecimalPlaces: 2 }, field: 'total', sortable: true }
    ];
    this.gridOptions = {
      enableGrouping: false,  
      enableAutoResize: true,       // true by default
      enableCellNavigation: true,
      autoHeight: true,
    
      //enableFiltering: true,
      
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
      presets: {
        columns: [
          { columnId: 'producto', width: 120, headerCssClass: 'customHeaderClass' },
          { columnId: 'Pallets', width: 20 },
          { columnId: 'posTotal', width: 40 },


          //{ columnId: 'Tarifa', width: 20 },
          // { columnId: 'posdia', width: 40 },
          { columnId: 'ingreso', width: 40 },
          { columnId: 'salida', width: 40 },
          { columnId: 'seguro', width: 40 },
         
     
          { columnId: 'total', width: 40 },
          
        ],

        sorters: [
          { columnId: 'producto', direction: 'DESC' },
          { columnId: 'id', direction: 'ASC' }
        ],

        pagination: { pageNumber: 2, pageSize: 20 }
      }
      
     
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
    this.model.PropietarioFiltroId =this.model.PropietarioId ;
    
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
    
    if(this.model.FechaInicio == undefined)
    {
        this.alertify.error("Seleccione una fecha de inicio");
        return ;
    }
    if(this.model.FechaFin == undefined)
    {
        this.alertify.error("Seleccione una fecha de fin");
        return ;
    }
    if(this.model.PropietarioId == undefined)
    {
        this.alertify.error("Seleccione un propietario");
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format("DD/MM/YYYY");
    this.model.FinCorte = moment(this.model.FechaFin).format("DD/MM/YYYY");
    this.model.PropietarioFiltroId =this.model.PropietarioId ;

    


    this.facturacionService.getPendientesLiquidacion(this.model.PropietarioFiltroId
      ,this.model).subscribe(list => {
      
        console.log(list);

      this.ClienteId = this.model.PropietarioFiltroId;

      this.ordenes = list;


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

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  generar() {

    if(this.model.FechaInicio == undefined)
    {
        this.alertify.error("Seleccione una fecha de inicio");
        return ;
    }
    if(this.model.FechaFin == undefined)
    {
        this.alertify.error("Seleccione una fecha de fin");
        return ;
    }
    if(this.model.PropietarioId == undefined)
    {
        this.alertify.error("Seleccione un propietario");
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format("DD/MM/YYYY");
    this.model.FinCorte = moment(this.model.FechaFin).format("DD/MM/YYYY");

    if(this.ClienteId == undefined){
      this.alertify.success("Debe cargar un cliente.");
      return;
    }
    this.model.ClienteId = this.ClienteId;
    this.facturacionService.generar_preliquidacion(this.model).subscribe(resp => {
      
     var url = "http://104.36.166.65/reptwh/Rep_Liquidacion.aspx?clienteid=" + String(this.ClienteId) +
      "&fecinicio=" + this.model.InicioCorte +  "&fecfin=" + this.model.FinCorte;
      window.open(url);
    });
  }
  preliminar(){

    if(this.model.FechaInicio == undefined)
    {
        this.alertify.error("Seleccione una fecha de inicio");
        return ;
    }
    if(this.model.FechaFin == undefined)
    {
        this.alertify.error("Seleccione una fecha de fin");
        return ;
    }
    if(this.model.PropietarioId == undefined)
    {
        this.alertify.error("Seleccione un propietario");
        return ;
    }

    this.model.InicioCorte = moment(this.model.FechaInicio).format("DD/MM/YYYY");
    this.model.FinCorte = moment(this.model.FechaFin).format("DD/MM/YYYY");


    this.model.ClienteId = this.ClienteId;
     var url = "http://104.36.166.65/reptwh/Rep_Liquidacion.aspx?clienteid=" + String(this.model.PropietarioId) +
      "&fecinicio=" + this.model.InicioCorte +  "&fecfin=" + this.model.FinCorte;
      window.open(url);
    
  }

}
