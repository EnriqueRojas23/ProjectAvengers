import { Component, OnInit, ViewChild } from '@angular/core';
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

  condition: any = false;
  almacenId: number;

  public loading = false;
  EquipoTransporteId: any;
  ubicaciones: Ubicacion[];
  model: any = {};
  modeldetail: any = {};

  inventarios: InventarioGeneral[] = [] ;
  inventario: InventarioGeneral;
  draggedInventario: InventarioGeneral;

  selectedInventarios: InventarioGeneral[] = [] ;


  id: any;
  cols: any[];   
  areas: Dropdownlist[] = [
  ];
  constructor(
     private alertify : AlertifyService
    ,private inventarioServicio : InventarioService   
    ,private generalService: GeneralService
    ,private activatedRoute: ActivatedRoute
    ,private router: Router) { }

  ngOnInit() {

    this.cols = 
    [
        {header: 'LPN', field: 'lodNum'  ,  width: '50px' },
        {header: 'PRODUCTO', field: 'descripcionLarga'  , width: '100px'   },
        {header: 'Cantidad', field: 'untQty'  ,  width: '50px'  },
        {header: 'Ubicación', field: 'ubicacion' , width: '80px'  },
        {header: 'Próxima Ubicación', field: 'ubicacionProxima'  , width: '80px'  },
        
    ];
    


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
      var sum = 0;
      var huella;

      console.log(resp);

      resp.forEach(element => {
        sum += element.untQty;
        huella = element.codigoHuella
      });
      
      this.inventarios.push({ 
        lodNum : "[ Todas los Pallets ]",
        productoId : 1,
        descripcionLarga: "",
        codigo: "",
        lotNum :"",
        untQty :sum
      });
      resp.forEach(element => {
        if(element.cantidad_productos > 1){ 
          element.descripcionLarga = "Varios Productos";
          element.lotNum = "Varios Lotes";
        }
        
          this.inventarios.push(element);
      });
      this.almacenId =   this.inventarios[1].almacenId;
        
      }, error => {
         
      }, () => { 
      });
  }
  onChange(value){
        this.generalService.getAllUbicaciones(this.almacenId,value.value).subscribe(list => {
        this.ubicaciones = list;
      });
      // $("html,body").animate({ scrollTop: 2500 }, "slow");
  }
identificar(id){
     this.inventarioServicio.get(id).subscribe(resp => {
       this.modeldetail =  resp;
       $("html,body").animate({ scrollTop: 2500 }, "slow");
   })
}
asignarUbicacion(){
  
  this.loading = true;
   
  if(this.selectedInventarios.length > 1){
        var inventarioTodos = this.selectedInventarios.filter(x=>x.productoId !== 1);
        this.selectedInventarios = [];
    }
    else {
      var inventarioTodos = this.selectedInventarios.filter(x=>x.productoId !== 1);
    }
 
  this.inventarioServicio.asignar_ubicacion(inventarioTodos).subscribe(resp => { 
  }, error => {
      this.alertify.error(error);
  }, () => { 
   
    this.terminar();
  });
 }

terminar() {
  this.inventarioServicio.terminar_acomodo(this.id).subscribe(resp => { 
    this.alertify.success("Se ha realizado el acomodo de las pallets con éxito.");
    this.router.navigate(['/recibo/listaordenrecibida', this.EquipoTransporteId ]);

  }, error => {
     if(error= "Err101") {
      this.alertify.error("Aún tiene pallets pendientes de acomodo.");   
     }
     this.alertify.error(error);
  }, () => { 
    this.loading = false;
  });
 }


  select_ubicacion(){
    
    if(this.condition) 
      this.condition = false;
    else 
      this.condition = true;

    
  }
  drop(event){
    
     if (this.draggedInventario) {
      this.draggedInventario.ubicacionId = event.id;

      if(this.draggedInventario.productoId == 1) {
        this.inventarios.forEach(element => {
            element.ubicacionId = event.id;
            this.selectedInventarios.push(element);
        });
        this.inventarios = null;
        this.alertify.success("Se agregaron las pallets a la ubicación seleccionada");
      }
      else {
        let draggedCarIndex = this.findIndex(this.draggedInventario);
        this.selectedInventarios = [...this.selectedInventarios, this.draggedInventario ];
        this.inventarios = this.inventarios.filter((val,i) => i!= draggedCarIndex);
        this.draggedInventario = null;

        if(this.inventarios.length == 1){
           if(this.inventarios[0].productoId == 1) {
            this.inventarios = null;
           }
        }
        this.alertify.success("Se agregó la pallet a la ubicación seleccionada");
       }
     }
  }
  dragStart(event,inventario: InventarioGeneral) {
    this.draggedInventario = inventario;
  } 
  dragEnd(event) {
    this.draggedInventario = null;
  }
  findIndex(car: InventarioGeneral) {
    let index = -1;
    for(let i = 0; i < this.inventarios.length; i++) {
        if (car.lodNum === this.inventarios[i].lodNum) {
            index = i;
            break;
        }
    }
    return index;
    }
    deshacer(){
      this.selectedInventarios = null;
      this.inventarios = [];
      this.selectedInventarios = [];

    this.inventarioServicio.getAll(this.id).subscribe(resp => { 
      var sum = 0;
      var huella;
      resp.forEach(element => {
        sum += element.untQty;
        huella = element.codigoHuella
      });
      
      this.inventarios.push({ 
        lodNum : "[ Todas los Pallets ]",
        productoId : 1,
        descripcionLarga: "",
        codigo: "",
        lotNum :"",
        untQty :sum
      });
      resp.forEach(element => {
        this.inventarios.push(element);
      });
      this.almacenId =   this.inventarios[1].almacenId;
        
      }, error => {
         
      }, () => { 
      });
      

    }
}
