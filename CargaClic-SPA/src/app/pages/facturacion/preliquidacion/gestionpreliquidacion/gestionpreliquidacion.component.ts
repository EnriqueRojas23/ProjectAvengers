import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog } from '@angular/material';
import { OrdenSalida } from 'src/app/_models/Despacho/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ReplaySubject, Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { FacturacionService } from 'src/app/_services/Facturacion/facturacion.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';
import { PreLiquidacion } from 'src/app/_models/Facturacion/preliquidacion';
import { DialogNuevaFactura } from 'src/app/pages/modal/ModalNuevaFactura/ModalNuevaFactura.component';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-gestionpreliquidacion',
  templateUrl: './gestionpreliquidacion.component.html',
  styleUrls: ['./gestionpreliquidacion.component.css']
})
export class GestionpreliquidacionComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select' , 'numLiquidacion' ,'propietario','estado','FechaLiquidacion' ,'SubTotal', 'Igv','Total','actionsColumn' ];
  
  listData: MatTableDataSource<PreLiquidacion>;
  public loading = false;
  preliquidaciones: PreLiquidacion[] = [];
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
  constructor(private facturacionService: FacturacionService,
    public dialog: MatDialog,
    private alertify: AlertifyService,
    private clienteService: ClienteService) { }

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
  selection = new SelectionModel<PreLiquidacion>(true, []);
  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }
  buscar() {
      this.facturacionService.getPreLiquidaciones(this.model).subscribe(list => {
      this.preliquidaciones = list;
      this.loading = false;
      this.listData = new MatTableDataSource(this.preliquidaciones);
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
  checkboxLabel(row?: PreLiquidacion): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.preliquidaciones.length;
    return numSelected === numRows;
  }
  generar(): void {

    if(this.selection.selected.length > 1 || this.selection.selected.length ==  0){
      this.alertify.error("Debe seleccionar solo una liquidación");
      return ;
    }
    
    
    

    const dialogRef = this.dialog.open(DialogNuevaFactura, {
      width: '700px',
      height: '500px',
      data: {codigo: this.selection.selected[0].id, descripcion: ""}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.model.descripcionLarga = result.descripcionLarga;
      this.model.codigo = result.codigo;
      this.model.productoid = result.id;
    });
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
