import { Component, OnInit, ViewChild } from '@angular/core';
import { RolService } from 'src/app/_services/rol.service';
import { Rol } from 'src/app/_models/rol';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-listaroles',
  templateUrl: './listaroles.component.html',
  styleUrls: ['./listaroles.component.css']
})
export class ListarolesComponent implements OnInit {
  roles: Rol[];
  listData: MatTableDataSource<Rol>;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  displayedColumns: string[] = [ 'Id','descripcion', 'alias' ,'activo', 'publico','actionsColumn' ];

  constructor(private rolService: RolService,private router: Router) { }

  ngOnInit() {
    this.rolService.getAll().subscribe(list => {
    this.roles = list;

      
    this.listData = new MatTableDataSource(this.roles);
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
    });
    
    $("html,body").animate({ scrollTop: 100 }, "slow");

  }
  edit(id){
    this.router.navigate(['/seguridad/asignaropciones',id]);
  


 }

}
