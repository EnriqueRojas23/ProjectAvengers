import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { OrdenRecibo } from 'src/app/_models/Recepcion/ordenrecibo';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { OrdenReciboService } from 'src/app/_services/Recepcion/ordenrecibo.service';
import { Router } from '@angular/router';
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
  displayedColumns: string[] = [ 'almacen', 'numOrden' ,'propietario','nombreEstado','ubicacion' ,'EquipoTransporte', 'Urgente','fechaRegistro','actionsColumn' ];
  

  listData: MatTableDataSource<OrdenRecibo>;
  public loading = false;
  ordenes: OrdenRecibo[];
  model: any;

  
  clientes: Dropdownlist[] = [
    {val: 1, viewValue: 'Desde Siempre'},
    {val: 2, viewValue: 'Hoy'},
    {val: 3, viewValue: 'Hace tres días'},
    {val: 4, viewValue: 'Hace una semana '},
    {val: 5, viewValue: 'Hace un mes '},
  ];
  estados: Dropdownlist[] = [
    {val: 1, viewValue: 'Planeado'},
    {val: 2, viewValue: 'Recibiendo'},
    {val: 3, viewValue: 'En Stage'},
    {val: 4, viewValue: 'Terminado'},
    
  ];

  
  constructor(private ordenreciboService: OrdenReciboService,
    private router: Router,
    private generalService: GeneralService) { }

  ngOnInit() {
    this.loading = true;
    this.model = { 
      "PropietarioId" : 1 ,
      "EstadoId" : 1,
      "DaysAgo" : 1
    };

    this.ordenreciboService.getAll(this.model).subscribe(list => {
      this.ordenes = list;
      console.log(list);
    this.loading = false;
    this.listData = new MatTableDataSource(this.ordenes);
    this.listData.paginator = this.paginator;
    this.listData.sort = this.sort;

    
    this.model.intervalo = 3;
    this.model.estadoIdfiltro = 1;
    
  
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
    this.router.navigate(['/identificarrecibo',id]);
  }

}
