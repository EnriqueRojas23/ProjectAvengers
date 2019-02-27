import { Component, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';


import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';
import { SelectionModel } from '@angular/cdk/collections';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';

@Component({
  selector: 'app-listaordenrecibo',
  templateUrl: './listaordenrecibo.component.html',
  styleUrls: ['./listaordenrecibo.component.css']
})
export class ListaordenreciboComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select','Propietario', 'NumOrden', 'nombreEstado' ,'EquipoTransporte', 'Urgente','FechaEsperada','actionsColumn' ];
  
  listData: MatTableDataSource<OrdenRecibo>;
  public loading = false;
  ordenes: OrdenRecibo[];
  model: any;


  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.model = { 
      "PropietarioId" : 1 ,
      "EstadoId" : 1,
      "DaysAgo" : 1
    };

    this.ordenreciboService.getAll(this.model).subscribe(list => {
      this.ordenes = list;
      
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;

    console.log(this.listData);
    
    
  
    this.listData.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        console.log(data);
        if(ele !='Id' && ele != 'Urgente' && ele != 'fechaesperada' && ele != 'select')
           {
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });

  }
  selection = new SelectionModel<OrdenRecibo>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.listData.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.listData.data.forEach(row => this.selection.select(row));
  }
  selectedRowIndex: number = -1;
  applyFilter() {
    
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }
   ver(id){
    this.router.navigate(['/verordenrecibo',id]);

   }



}
