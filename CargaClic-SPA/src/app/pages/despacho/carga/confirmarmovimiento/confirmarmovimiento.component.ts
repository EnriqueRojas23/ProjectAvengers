import { Component, OnInit, ViewChild, Inject, ViewEncapsulation } from '@angular/core';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { MatSort, MatPaginator, MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdenSalidaService } from 'src/app/_services/Despacho/ordensalida.service';



@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal.confirmarsalida2.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalConfirmRetiro {
  public loading = false;
  constructor(public modal: NgbActiveModal) {}
}


@Component({
  selector: 'app-confirmarmovimiento',
  templateUrl: './confirmarmovimiento.component.html',
  styleUrls: ['./confirmarmovimiento.component.css']
})
export class ConfirmarmovimientoComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'lodNum', 'descripcionLarga' , 'lotnum' , 'cantidadPallet', 'cantidadRetiro' , 'ubicacion','proximaubicacion', 'actionsColumn' ];
  listData: MatTableDataSource<InventarioGeneral>;
  
  model: any = {} ;
  id: any;
  closeResult: string;



  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2:number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' ,'area', 'sugerido' ,'estado' ,'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  ubicaciones: Ubicacion[];

  public loading = false;

  constructor(private ordenSalidaService : OrdenSalidaService 
    ,private activatedRoute: ActivatedRoute
    ,private _modalService: NgbModal
    ,public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
    console.log(this.id);
//    this.model.EquipoTransporteId  = this.activatedRoute.snapshot.params["uid2"];
    
    

    this.ordenSalidaService.getAllWorkDetail(this.id).subscribe(resp => { 
      
      console.log(resp);
       this.model = resp;
       this.listData = new MatTableDataSource(this.model);
       this.listData.paginator = this.paginator;
       this.listData.sort = this.sort;
       
       this.listData.filterPredicate = (data,filter) => {
         return this.displayedColumns.some(ele => {
           
           if(ele !='Id' && ele != 'activo' && ele != 'publico')
              {
                 return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
            
              }
           })
          }
       
     }, error => {
        
     }, () => { 
           
     });
  }

 Confirmar(id) {

  
  const modal =  this._modalService.open(NgbdModalConfirmRetiro, { windowClass: 'danger-modal' });
  modal.componentInstance.model = id;

   modal.result.then((result) => {
    this.closeResult = `${result}`;
    
    if(this.closeResult == "Ok")
    {
      this.loading  = true;
      this.ordenSalidaService.movimientoSalida(id).subscribe(resp => { 
      }, error => {
        //this.alertify.error(error);
      }, () => { 
  
        this.ordenSalidaService.getAllWorkDetail(this.id).subscribe(resp => { 
           
          console.log(resp);
           this.model = resp;
           this.listData = new MatTableDataSource(this.model);
           this.listData.paginator = this.paginator;
           this.listData.sort = this.sort;
           
           this.listData.filterPredicate = (data,filter) => {
             return this.displayedColumns.some(ele => {
               
               if(ele !='Id' && ele != 'activo' && ele != 'publico')
                  {
                     return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
                
                  }
               })
              }
           
         }, error => {
            
         }, () => { 
          this.loading  = false;
         });
    });

     }
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
       
    });
  

}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

  regresar(){
    
    this.router.navigate(['/trabajador']);
  }
}

