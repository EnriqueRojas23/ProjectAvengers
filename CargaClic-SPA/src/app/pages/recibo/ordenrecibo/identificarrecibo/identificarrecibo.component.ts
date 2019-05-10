import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { OrdenReciboDetalle } from 'src/app/_models/Recepcion/ordenrecibo';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { ProductoService } from 'src/app/_services/Mantenimiento/producto.service';
import { NgForm } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/pages/account-settings/datepicker.extend';

declare var $: any;

@Component({
  selector: 'app-identificarrecibo',
  templateUrl: './identificarrecibo.component.html',
  styleUrls: ['./identificarrecibo.component.css'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class IdentificarreciboComponent implements OnInit {
  public loading = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Linea', 'Codigo', 'Descripcion' , 'Cantidad', 'CantidadRecibida', 'CantidadRestante', 'Completo' , 'actionsColumn' ];
  listData: MatTableDataSource<OrdenReciboDetalle>;
  model: any = {} ;
  modeldetail: any = {};
  public selected2: any;
  searchKey: string;
  id: any;
  EquipoTransporteId: any;
  
  estadoInventario: Dropdownlist[] = [
  ];
  huellas: Dropdownlist[] = [
  ];
  huellaDetalle: Dropdownlist[] = [
  ];

  constructor(private ordenServicio : OrdenReciboService
    ,private activatedRoute: ActivatedRoute
    ,private router: Router
    ,private generalService: GeneralService
    ,private alertify: AlertifyService
    ,private productoService: ProductoService) { }

  ngOnInit() {

    this.generalService.getAll(3).subscribe(resp=>
      {
        
        resp.forEach(element => {
          this.estadoInventario.push({
            val: element.id ,
            viewValue: element.nombreEstado
          })
        });
      });



    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.EquipoTransporteId= this.activatedRoute.snapshot.params["uid2"];

    this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
    this.model = resp;
      this.listData = new MatTableDataSource(this.model.detalles);
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

identificar(id){
   //this.huellas = null;

   this.loading = true;
   

   $("html,body").animate({ scrollTop: 500 }, "slow");
    this.ordenServicio.obtenerOrdenDetalle(id).subscribe(resp => {
      
      this.modeldetail =  resp;
      this.huellas = [];
      this.productoService.getHuellas(this.modeldetail.productoId).subscribe(resp=>
      {

        resp.forEach(element => {
          this.huellas.push({
            val: element.id ,
            viewValue: element.codigoHuella + ' -Cama de  ' + element.caslvl 
          })
        });
      });

      this.loading = false;
    })

  
}
actualizar(form: NgForm){

  this.loading = true;
   
  if (form.invalid) {
    return; 
  }


  
  
  this.ordenServicio.identificar_detalle(this.modeldetail).subscribe(resp => { 

    }, error => {
      this.loading = false;
       if(error == "err010")
       this.alertify.error("La cantidad que intenta recibir supera el límite de la cantidada esperada");
       else 
       this.alertify.error(error);
    }, () => { 

      this.id  = this.activatedRoute.snapshot.params["uid"];
      
      this.ordenServicio.obtenerOrden(this.id).subscribe(resp => { 
      this.model = resp;
      
      
        this.listData = new MatTableDataSource(this.model.detalles);
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
        this.loading = false;
      }, () => { 
        this.loading = false;
      });

      this.loading = false;
      this.modeldetail = {};
      $("html,body").animate({ scrollTop: 0 }, "slow");
      this.alertify.success("Se actualizó correctamente.");
      //this.router.navigate(['/listausuarios']);
    });
    
}
CambioHuella(id){
  this.huellaDetalle = [];
      this.productoService.getHuellasDetalle(id).subscribe(resp=>
      {
        
        resp.forEach(element => {
          this.huellaDetalle.push({
            val: element.unidadMedidaId ,
            viewValue: element.unidadMedida + ' - ' + element.untQty + ' Unidades'
          })
        });
      });

}
numberOnly(event): boolean {
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
 }


terminar() {
     
    //cambiar de estado a la orden de recibo
    //Ubicar en puerta el inventario
 
    

   
   
    this.ordenServicio.cerrar_identificacion(this.id).subscribe(resp => { 
    }, error => {
      if(error == 'err011')
        this.alertify.error("Tiene líneas pendientes por identificar"); 
      else
        this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se actualizó correctamente.");
      this.router.navigate(['/listaordenrecibida',  this.EquipoTransporteId ]);
    });
}
regresar(){
  this.router.navigate(['/listaordenrecibida',  this.EquipoTransporteId ]);
}

}