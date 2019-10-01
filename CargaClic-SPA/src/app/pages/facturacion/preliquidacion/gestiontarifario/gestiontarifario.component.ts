import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Column } from 'ag-grid-community';
import { GridOption, AngularGridInstance } from 'angular-slickgrid';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { PreLiquidacion, Tarifa } from 'src/app/_models/Facturacion/preliquidacion';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { AgGridAngular } from 'ag-grid-angular';

import * as moment from 'moment';
import { CellRendererProductos } from 'src/app/_common/Renderers/cellRendererProductos/cellRendererProductos.component';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestiontarifario',
  templateUrl: './gestiontarifario.component.html',
  styleUrls: ['./gestiontarifario.component.css']
})
export class GestiontarifarioComponent implements OnInit {

  @ViewChild('agGrid') agGrid: AgGridAngular;
  @ViewChild('greetCell') greetCell: TemplateRef<any>;
  
  public defaultColDef;
  public columnTypes;
  private gridApi;
  private gridColumnApi;
  public frameworkComponents;
  public context;

  //productos: Dropdownlist[] = [];
  clientes: Dropdownlist[] = [];
  productos2: Dropdownlist[] = [];

  public productos: any = {};
  productosForDropdown: any[];


  style = {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box'
  };

  columnDefs = [
    {
      headerName: 'PRODUCTO', field: 'descripcionLarga' , suppressSizeToFit: true ,width: 320
     ,editable: false
     ,cellRenderer: "genderCellRenderer"
    },
    {headerName: 'POS', field: 'pos'  ,  width: 100 ,resizable: true,editable: false},
    {headerName: 'IN', field: 'ingreso' ,resizable: true , width: 100,editable: false },
    {headerName: 'OUT', field: 'salida' ,resizable: true , width: 100,editable: false },
    {headerName: 'SEGURO', field: 'seguro' ,resizable: true , width: 100,editable: false },
];
rowData: any;




  
  public loading = false;
  ordenes: Tarifa[] = [];
  model: any  = {};
  ClienteId: number ;
  
  
  EstadoId : number;
  

  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(  private clienteService: ClienteService,
    private alertify: AlertifyService,
    private productoService: ProductoService,
    private router: Router,
    private facturacionService: FacturacionService) {

      
    this.context = { componentParent: this };
    this.frameworkComponents = {
       genderCellRenderer : CellRendererProductos,
       
       
    };

    this.defaultColDef = {
      width: 150,
      editable: true,
      filter: "agTextColumnFilter"
    };




   }
     

  ngOnInit() {

    this.model.PropietarioId = 1;

    this.productoService.getAll("",this.model.PropietarioId ).subscribe(resp=> {
       
    this.productos= resp;

    // resp.forEach(element => {
    //     this.productos.push({ val: element.id , viewValue: element.descripcionLarga});
    // });  

       this.productosForDropdown = this.productos.map(x => x.descripcionLarga);
       console.log(this.productosForDropdown);
    });
   

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





    
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.ordenes.length;
    return numSelected === numRows;
  }
  selection = new SelectionModel<Tarifa>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  checkboxLabel(row?: Tarifa): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
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
    
   
    if(this.model.PropietarioId == undefined)
    {
        this.alertify.error("Seleccione un propietario");
        return ;
    }

    this.model.PropietarioFiltroId =this.model.PropietarioId ;

    this.facturacionService.getTarifas(this.model.PropietarioFiltroId).subscribe(list => {
     

      this.rowData = list;
    });

    this.productoService.getAll("",this.model.PropietarioId ).subscribe(resp=> {
       
      this.productos= resp;

      // resp.forEach(element => {
      //     this.productos.push({ val: element.id , viewValue: element.descripcionLarga});
      // });  
  
         this.productosForDropdown = this.productos.map(x => x.descripcionLarga);
          
      // resp.forEach(element => {
      //   this.productos.push({ val: element.id , viewValue: element.descripcionLarga});
      // });  
      //  this.productosForDropdown = this.productos.DocumentTypes.map(x => x.descripcionLarga);
    });

  
  }


  
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.model.PropietarioFiltroId = 1;

    this.facturacionService.getTarifas(this.model.PropietarioFiltroId).subscribe(list => {
        this.rowData = list;
      });
  }
  onInsert() {
    // var newItem = createNewRowData();
    // var res = this.gridApi.updateRowData({
    //   add: [newItem]
    // });
    this.router.navigate(['/facturacion/nuevatarifa',  this.model.id ]);
    
  }
  onCellValueChanged(params) {
    var colId = params.column.getId();
    if (colId === "country") {
      var selectedCountry = params.data.country;
      var selectedCity = params.data.city;
      var allowedCities = countyToCityMap(selectedCountry);
      var cityMismatch = allowedCities.indexOf(selectedCity) < 0;
      if (cityMismatch) {
        params.node.setDataValue("city", null);
      }
    }
  }
  ShowSitesLinkFromParent(cell){
    var rowNode = this.gridApi.getRowNode(cell);
    this.router.navigate(['/facturacion/editartarifa',rowNode.data.id]);
  }


}

function createNewRowData() {
  var tarifa = {
    descripcionLarga: "Toyota " ,
    pos: "Celica " ,
    ingreso: "",
    salida: "Headless",
    seguro: "Little",
    
  };
  return tarifa;
}
function countyToCityMap(match) {
  var map = {
    Ireland: ["Dublin", "Cork", "Galway"],
    USA: ["New York", "Los Angeles", "Chicago", "Houston"]
  };
  return map[match];
}