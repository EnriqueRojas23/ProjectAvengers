import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ajusteinventariodetalle',
  templateUrl: './ajusteinventariodetalle.component.html',
  styleUrls: ['./ajusteinventariodetalle.component.css']
})
export class AjusteinventariodetalleComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'lotNum', 'fechaExpire', 'untQty','fechaEsperada','fechaRegistro', 'codigoHuella' ,'actionsColumn' ];
  model: any = {};
  inventario: InventarioGeneral[] = [];
  selection = new SelectionModel<InventarioGeneral>(true, []);
  
  public loading = false;
  listData: MatTableDataSource<InventarioGeneral>;
  
  constructor(public inventarioService : InventarioService
    ,private router: Router
    , public activeRoute: ActivatedRoute
    ) { }

  ngOnInit() {
      let id =   this.activeRoute.snapshot.params["uid"];
      this.inventarioService.getAllInventarioAjusteDetalle(id).subscribe(resp => {
        console.log(resp);
        this.model = resp[0];
        this.inventario = resp;
        this.loading = false;
        this.listData = new MatTableDataSource(this.inventario);
        this.listData.paginator = this.paginator;
        this.listData.sort = this.sort;
    
      
        this.listData.filterPredicate = (data,filter) => {
          return this.displayedColumns.some(ele => {
            
            if(ele != 'ubicacion'  && ele != 'select' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
               {
                  
                  return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
             
               }
            })
           }
        });
  }

  checkSelects() {
    return  this.selection.selected.length > 0 ?  false : true;
  }

  checkboxLabel(row?: InventarioGeneral): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows =  this.inventario.length;
    return numSelected === numRows;
  }

  edit(id){
    this.router.navigate(["/inventario/nuevoajuste", id ,   this.activeRoute.snapshot.params["uid"]]);
  }

  regresar(){
    this.router.navigate(["/inventario/ajusteinventario"]);
  }
  applyFilter() {
    
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

}
