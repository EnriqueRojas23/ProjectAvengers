import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Vehiculo } from 'src/app/_models/Mantenimiento/vehiculo';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';


@Component({
  selector: 'app-listadovehiculo',
  templateUrl: './listadovehiculo.component.html',
  styleUrls: ['./listadovehiculo.component.css']
})
export class ListadovehiculoComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Placa', 'TipoVehiculo','Modelo', 'Marca', 'actionsColumn' ];

  vehiculos: Vehiculo[];

  listData: MatTableDataSource<Vehiculo>;
  model: any = {};


  constructor(private equipotransporteService: GeneralService) {
    
      

    }

  ngOnInit() {
    //this.loading = true;

    this.equipotransporteService.getVehiculos(this.model.codigo).subscribe(x=> {
      this.vehiculos = x;
      this.listData = new MatTableDataSource(this.vehiculos);
      this.listData.paginator = this.paginator;
      this.listData.sort = this.sort;

      this.listData.filterPredicate = (data,filter) => {
        return this.displayedColumns.some(ele => {
          
          if(ele !='Id' && ele != 'enLinea' && ele != 'Dni')
            {
                return ele != 'actionsColumn' && data[ele].toLowerCase().indexOf(filter) != -1;
          
            }
          })
        }
      });
  }

}
