import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator, MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Dropdownlist } from 'src/app/_models/Constantes';

import { DialogData } from 'src/app/pages/seguridad/usuario/listausuarios/listausuarios.component';




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.excepciones.html',
  
})
export class DialogExcepciones {
  areas: Dropdownlist[] = [];
  model: any =  {};
  ubicaciones: Ubicacion[];

  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2:number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' ,'area', 'sugerido' ,'estado' ,'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  id: number;

  constructor(
    public dialogRef: MatDialogRef<DialogExcepciones>,
    private generalService: GeneralService,
    private inventarioServicio : InventarioService,
    
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.id =  data["id"]
      this.generalService.getAreas().subscribe(resp=>
        {
          resp.forEach(element => {
            this.areas.push({
              val: element.id ,
              viewValue: element.nombre
            })
          });
        });


    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save(id){

   
    
  }
  onChange(value){
    this.generalService.getAllUbicaciones(1,value.value).subscribe(list => {
    this.ubicaciones = list;
      
    
    this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
    this.listUbicaciones.paginator = this.paginator2;
    this.listUbicaciones.sort = this.sort2;


    this.listUbicaciones.filterPredicate = (data,filter) => {
      return this.displayedColumns2.some(ele => {
        
        if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });
  }

  asignarUbicacion(id){
    //let ordenReciboId = this.activatedRoute.snapshot.params["uid"];
    
    this.inventarioServicio.asignar_ubicacion(this.id,id).subscribe(resp => { 
    }, error => {
       //this.alertify.error(error);
    }, () => { 
     
      
      this.generalService.getAllUbicaciones(1,this.model.areaId).subscribe(list => {
        this.ubicaciones = list;
        
      //this.loading = false;
      this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
      this.listUbicaciones.paginator = this.paginator2;
      this.listUbicaciones.sort = this.sort2;
  
  
      this.listUbicaciones.filterPredicate = (data,filter) => {
        return this.displayedColumns2.some(ele => {
          
          if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
             {
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
             }
          })
         }
      });
  
    });
   }
}


// @Component({
//   selector: 'ngbd-modal-confirm-autofocus',
//   templateUrl: './modal.excepciones.html',
//   encapsulation: ViewEncapsulation.None,
// })
// export class NgbdModalExcepcionesAlmacenamiento {

//   constructor(public modal: NgbActiveModal,private generalService: GeneralService) {



//   }
// }


@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal.confirmar.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalConfirmAlmacenamiento {
  constructor(public modal: NgbActiveModal) {}
}



@Component({
  selector: 'app-almacenamiento',
  templateUrl: './almacenamiento.component.html',
  styleUrls: ['./almacenamiento.component.css']
})
export class AlmacenamientoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'lodNum', 'descripcionLarga', 'untQty' , 'ubicacion','proximaubicacion', 'actionsColumn' ];
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



  constructor(private inventarioServicio : InventarioService 
    ,private activatedRoute: ActivatedRoute
    ,private _modalService: NgbModal
    ,public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
//    this.model.EquipoTransporteId  = this.activatedRoute.snapshot.params["uid2"];
    
    

    this.inventarioServicio.getAll(this.id).subscribe(resp => { 
      
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

  



  const modal =  this._modalService.open(NgbdModalConfirmAlmacenamiento, { windowClass: 'danger-modal' });
  modal.componentInstance.model = id;

   modal.result.then((result) => {
    this.closeResult = `${result}`;
    
    if(this.closeResult == "Ok")
    {
      this.inventarioServicio.almacenamiento(id).subscribe(resp => { 
      }, error => {
        //this.alertify.error(error);
      }, () => { 
        this.inventarioServicio.getAll(this.id).subscribe(resp => { 
          
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
excepcion(id): void { 
  
      const dialogRef = this.dialog.open(DialogExcepciones, {
        width: '650px',
        height: '500px',
        data: {id: id }
      });


      dialogRef.afterClosed().subscribe(result => {
          
        //this.animal = result;
      });    

  }
  regresar(){
    //console.log( this.model.EquipoTransporteId)
    this.router.navigate(['/listaordenrecibida',  this.activatedRoute.snapshot.params["uid2"] ]);
  }
}
