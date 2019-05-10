import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';

@Component({
  selector: 'app-listaordenrecibida',
  templateUrl: './listaordenrecibida.component.html',
  styleUrls: ['./listaordenrecibida.component.css']
})
export class ListaordenrecibidaComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'almacen', 'numOrden' ,'propietario','nombreEstado','ubicacion' ,'fechaRegistro','actionsColumn' ];
  

  listData: MatTableDataSource<OrdenRecibo>;
  public loading = false;
  ordenes: OrdenRecibo[];
  model: any  ;

  
  clientes: Dropdownlist[] = [
    {val: 0, viewValue: 'Desde Siempre'},
    {val: 1, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 7, viewValue: 'Hace una semana '},
    {val: 31, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
    
    {val: 5, viewValue: 'Asignado'},
    {val: 6, viewValue: 'Recibiendo'},
    {val: 12, viewValue: 'Terminado'},
    
  ];

  
  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService) { }

  ngOnInit() {

    this.loading = true;
    this.model = {
    };
    this.model.EquipoTransporteId = this.activatedRoute.snapshot.params["uid"];
    this.ordenreciboService.getAllByEquipoTransporte(this.model).subscribe(list => {

      console.log(list);
    this.model.equipotransporte =  list[0].equipotransporte;
    
    this.ordenes = list;
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
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
  identificar(id){
    this.router.navigate(['recibo/identificarrecibo',id, this.model.EquipoTransporteId ]);
  }
  acomodo(id){
    this.router.navigate(['recibo/acomodopallets',id,  this.model.EquipoTransporteId ]);
  }
  almacenar(id){
    this.router.navigate(['recibo/almacenamiento',id,  this.model.EquipoTransporteId ]);
  }
  buscar(){
    console.log(this.model);
    this.ordenreciboService.getAll(this.model).subscribe(list => {
      this.ordenes = list;
       
      this.loading = false;
      this.listData = new MatTableDataSource(this.ordenes);
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

     equipotransporte(){
      this.router.navigate(['/equipotransporteentrante']);
     }
     openDoor(id){
      this.router.navigate(['/asignarpuerta',id]);
     }
  
}
