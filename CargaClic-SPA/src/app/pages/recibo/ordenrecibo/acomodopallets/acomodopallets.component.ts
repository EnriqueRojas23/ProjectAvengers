import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { InventarioGeneral } from 'src/app/_models/Inventario/inventariogeneral';
import { InventarioService } from 'src/app/_services/Inventario/inventario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { Ubicacion } from 'src/app/_models/Mantenimiento/ubicacion';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { SelectionModel } from '@angular/cdk/collections';


declare var $: any;

@Component({
  selector: 'app-acomodopallets',
  templateUrl: './acomodopallets.component.html',
  styleUrls: ['./acomodopallets.component.css']
})
export class AcomodopalletsComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'select','lodNum', 'descripcionLarga', 'untQty' , 'ubicacion','proximaubicacion', 'actionsColumn' ];
  listData: MatTableDataSource<InventarioGeneral>;

  @ViewChild(MatSort) sort2: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator;
  searchKey2: string;
  pageSizeOptions2:number[] = [5, 10, 25, 50, 100];
  displayedColumns2: string[] = [ 'ubicacion', 'almacen' ,'area', 'sugerido' ,'estado' ,'actionsColumn' ];
  listUbicaciones: MatTableDataSource<Ubicacion>;
  EquipoTransporteId: any;
  ubicaciones: Ubicacion[];

  modeldetail: any = {};
  model: any = {} ;
  id: any;
  
  areas: Dropdownlist[] = [
  ];
  // ubicaciones: Dropdownlist[] = [
  // ];


  constructor(
     private alertify : AlertifyService
    ,private inventarioServicio : InventarioService   
    ,private generalService: GeneralService
    ,private activatedRoute: ActivatedRoute
    ,private router: Router) { }

  ngOnInit() {

    this.generalService.getAreas().subscribe(resp=>
      {
        
        
        resp.forEach(element => {
          this.areas.push({
            val: element.id ,
            viewValue: element.nombre
          })
        });
      });




    this.id  = this.activatedRoute.snapshot.params["uid"];
    this.EquipoTransporteId = this.activatedRoute.snapshot.params["uid2"];

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
  onChange(value){
    

      this.generalService.getAllUbicaciones(1,value.value).subscribe(list => {
        this.ubicaciones = list;
        
      //this.loading = false;
      this.listUbicaciones = new MatTableDataSource(this.ubicaciones);
      this.listUbicaciones.paginator = this.paginator2;
      this.listUbicaciones.sort = this.sort2;
  
  
      this.listUbicaciones.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          
          if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
             {
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
           
             }
          })
         }
      });
      $("html,body").animate({ scrollTop: 2500 }, "slow");


  }

identificar(id){
     this.inventarioServicio.get(id).subscribe(resp => {
       this.modeldetail =  resp;
       $("html,body").animate({ scrollTop: 2500 }, "slow");
   })

}
asignarUbicacion(id){
  //let ordenReciboId = this.activatedRoute.snapshot.params["uid"];
  let ids = '';
  if(this.selection.selected.length > 1){
    this.modeldetail.lodNum = "Seleccionados";
    this.selection.selected.forEach(ele => 
      ids = ids + ele.id.toString() + ','
    )

    ids = ids.substring(0,ids.length -1);
    this.modeldetail.id = ids;
    this.masterToggle();
    }
 
  this.inventarioServicio.asignar_ubicacion(this.modeldetail.id,id).subscribe(resp => { 
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
      return this.displayedColumns.some(ele => {
        
        if(ele != 'EquipoTransporte' && ele !='Almacen' && ele != 'Urgente' && ele != 'fechaEsperada' && ele != 'fechaRegistro')
           {
              return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
         
           }
        })
       }
    });

    let areatemp =  this.model.areaId;
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
         this.model.areaId = areatemp;
      
    }, error => {
       
    }, () => { 
          
    });
    $("html,body").animate({ scrollTop: 0 }, "slow");

  });
 }

terminar() {
  this.inventarioServicio.terminar_acomodo(this.id).subscribe(resp => { 
    this.alertify.success("Se ha realizado el acomodo de las pallets con éxito.");
    this.router.navigate(['/listaordenrecibida', this.EquipoTransporteId ]);

  }, error => {
     if(error= "Err101") {
      this.alertify.error("Aún tiene pallets pendientes de acomodo.");   
     }
//     this.alertify.error(error);
  }, () => { 
        
  });
 }
 selection = new SelectionModel<InventarioGeneral>(true, []);

 checkboxLabel(row?: InventarioGeneral): string {
  

  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows =  this.model.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.listData.data.forEach(row =>{
        this.selection.select(row);
        //this.inventarioServicio.get(row.id).subscribe(resp => {
          if(this.selection.selected.length > 1){
              this.modeldetail.lodNum = "Seleccionados";
          }
        //});  
      });

}
checkSelects() {
    
  return  this.selection.selected.length > 0 ?  false : true;
}
highlight(row){
    
      this.selection.isSelected(row) ? this.selection.deselect(row) : this.selection.select(row);


      this.inventarioServicio.get(row.id).subscribe(resp => {
        if(this.selection.selected.length > 1){
            this.modeldetail.lodNum = "Seleccionados";
        }
        else{
          this.modeldetail =  resp;
          $("html,body").animate({ scrollTop: 2500 }, "slow");
        }
        

       
        
    })
  
  }
}
