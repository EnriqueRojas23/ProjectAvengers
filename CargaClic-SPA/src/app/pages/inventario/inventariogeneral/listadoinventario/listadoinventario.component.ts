import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-listadoinventario',
  templateUrl: './listadoinventario.component.html',
  styleUrls: ['./listadoinventario.component.css']
})
export class ListadoinventarioComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select','almacen', 'numOrden' ,'propietario','nombreEstado','ubicacion' ,'equipotransporte','fechaEsperada','fechaRegistro','actionsColumn' ];
  
  listData: MatTableDataSource<InventarioGeneral>;
  public loading = false;
  ordenes: InventarioGeneral[] = [];
  model: any;

  clientes: Dropdownlist[] = [];
  public filteredClientes: ReplaySubject<Dropdownlist[]> = new ReplaySubject<Dropdownlist[]>(1);
  public ClientesCtrl: FormControl = new FormControl();
  public ClientesFilterCtrl: FormControl = new FormControl();
  protected _onDestroy = new Subject<void>();
  
  constructor(private inventarioService: InventarioService 
    ,private clienteService: ClienteService) { }

  ngOnInit() {
    this.model = {
    };
    
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
  buscar(id){
    var url = "http://104.36.166.65/reptwh/Rep_Inventario.aspx?clienteid=" + String(id) ;
    window.open(url);
  }

}
