import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { MatSort, MatPaginator, MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { DialogData } from 'src/app/_models/Common/dialogdata';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './ModalAsignarPuerta.component.html',
  styleUrls: ['./ModalAsignarPuerta.component.css']
})
export class DialogAsignarPuerta implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'ubicacion', 'almacen' ,'area','estado' ,'actionsColumn' ];
  listData: MatTableDataSource<Ubicacion>;



  public loading = false;
  ubicaciones: Ubicacion[];
  model: any;


  constructor(private ordensalidaService: OrdenSalidaService,
    public dialogRef: MatDialogRef<DialogAsignarPuerta>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private alertify: AlertifyService,
    private generalService: GeneralService) { 
      

    }

  ngOnInit() {

    this.generalService.getAllUbicaciones(1,1).subscribe(list => {
      this.ubicaciones = list;
      this.loading = false;
      this.listData = new MatTableDataSource(this.ubicaciones);
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
  asignarPuerta(id){
    
    let ids = "";
    
    this.data.codigo.forEach(elem => {
      ids =   ',' + elem.id;
    })
    
    ids = ids.substring(1,ids.length + 1);
    console.log(ids);

    this.ordensalidaService.assignmentOfDoor(ids,id).subscribe(resp => { 
    }, error => {
         this.alertify.error(error);
    }, () => { 
        this.alertify.success("Se registró correctamente.");
        this.dialogRef.close();
    });
  }


}
