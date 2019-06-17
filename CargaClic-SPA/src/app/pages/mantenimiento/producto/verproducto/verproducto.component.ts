import { Component, OnInit, Inject } from '@angular/core';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { modelGroupProvider } from '@angular/forms/src/directives/ng_model_group';

  export interface DialogData {
    id: number;
    CodigoHuella: string;
    ProductoId: any;
    caslvl: number;
  }


  @Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'modal.editar.html',
    
  })
  export class DialogEditarHuella {
    id: number;
    model : any = {};

    constructor(
      public dialogRef: MatDialogRef<DialogEditarHuella>,
      private productoService: ProductoService,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        
        this.productoService.getHuella(data.id).subscribe(resp => {
          this.model = resp;
          data.ProductoId = data.id;
          data.CodigoHuella = this.model.codigoHuella;
          data.caslvl = this.model.caslvl;
        })

      }
    onNoClick(): void {
      this.dialogRef.close();
    }
  
    numberOnly(event): boolean {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
      return true;
    }
      
    
  }




@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.nuevo.html',
  
})
export class DialogNuevoHuella {
  id: number;
  model : any = {};

  constructor(
    public dialogRef: MatDialogRef<DialogNuevoHuella>,
    private productoService: ProductoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      
     data.ProductoId = data.id;

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save(form: NgForm) {
    
    if (form.invalid) {
      return; 
    }
    this.productoService.registrarHuella(this.data).subscribe(resp => { 
    }, error => {
       
    }, () => { 
      this.dialogRef.close();
    });
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
   }
    
  
}






@Component({
  selector: 'app-verproducto',
  templateUrl: './verproducto.component.html',
  styleUrls: ['./verproducto.component.css']
})
export class VerproductoComponent implements OnInit {
  id: any;
  model: any = {};
  huellas: any[] = []; 
  total : number = 0;
  huella: number;
  
  constructor(private productoService: ProductoService
    ,private activatedRoute: ActivatedRoute,
     private router: Router ,
    public dialog: MatDialog) {

    
     }

  ngOnInit() {
    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.productoService.get(this.id).subscribe(result=> {
        this.model = result;
    });

     this.productoService.getHuellas(this.id).subscribe(result => {

       result.forEach(x=>  {
         console.log(x.cantidad);
         
         this.total = this.total +  x.cantidad ;
       }
       

       )
       result.forEach(x=>  {
         x.cantidad = ( x.cantidad * 100) / this.total  ;
         
        
      });
       this.huellas = result;
     

       console.log(this.huellas);
     });
    
  }
  openDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogEditarHuella, {
      width: '550px',
      height: '250px',
      data: {id: id , ProductoId : this.id }
    });


    dialogRef.afterClosed().subscribe(result => {
      this.productoService.getHuellas(this.id).subscribe(result => {

        result.forEach(x=>  {
          console.log(x.cantidad);
          
          this.total = this.total +  x.cantidad ;
        }
        
 
        )
        result.forEach(x=>  {
          x.cantidad = ( x.cantidad * 100) / this.total  ;
          
         
       });
        this.huellas = result;
      
 
        console.log(this.huellas);
      });
      this.huella = result;
    });
  }

  nuevoDialog(id: any): void {
    const dialogRef = this.dialog.open(DialogNuevoHuella, {
      width: '550px',
      height: '250px',
      data: {id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.productoService.getHuellas(this.id).subscribe(result => {

        result.forEach(x=>  {
          console.log(x.cantidad);
          
          this.total = this.total +  x.cantidad ;
        }
        
 
        )
        result.forEach(x=>  {
          x.cantidad = ( x.cantidad * 100) / this.total  ;
          
         
       });
        this.huellas = result;
      
 
        console.log(this.huellas);
      });
      this.huella = result;
    });
  }


  nuevahuella(id){
    this.router.navigate(['/mantenimiento/nuevahuelladetalle',id,this.id]);

  }
}

