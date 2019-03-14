import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-asignarpuerta',
  templateUrl: './asignarpuerta.component.html',
  styleUrls: ['./asignarpuerta.component.css']
})
export class AsignarpuertaComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'ubicacion', 'almacen' ,'area','estado' ,'actionsColumn' ];


  listData: MatTableDataSource<Ubicacion>;
  public loading = false;
  ubicaciones: Ubicacion[];
  model: any;



  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router,
    private activatedRoute: ActivatedRoute,private alertify: AlertifyService) { }

  ngOnInit() {
    this.ordenreciboService.getAllUbicaciones(1,1).subscribe(list => {
      this.ubicaciones = list;
      console.log(list);
    this.loading = false;
    this.listData = new MatTableDataSource(this.ubicaciones);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;


    this.listData.filterPredicate = (data,filter) => {
      return this.displayedColumns.some(ele => {
        
        if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
            console.log(ele);
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });



  }

  asignarPuerta(id){
    let ordenReciboId = this.activatedRoute.snapshot.params["uid"];
    console.log(ordenReciboId);
    this.ordenreciboService.assignmentOfDoor(ordenReciboId,id).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['/listaordenrecibo']);
    });
  }

}
