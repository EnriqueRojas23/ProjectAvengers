import { Component, OnInit, ViewChild, ViewEncapsulation, Inject } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { DataSource } from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort , MatFormField   } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AngularDualListBoxModule, DualListComponent } from 'angular-dual-listbox';
import { RolService } from 'src/app/_services/rol.service';
import { RolUserForRegisterResult } from 'src/app/_models/paginarol';
import { OverlayContainer } from '@angular/cdk/overlay';

export interface DialogData {
  id: number;
  animal: string;
  name: string;
}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.asociarrol.html',
  
})
export class DialogOverviewExampleDialog {
  source = [];
  target = [];
  format = { add: 'Agregar', remove: 'Quitar', all: 'Todo', none: 'Ninguno',
  direction: DualListComponent.LTR, draggable: true, locale: 'es'  };
  aux_source = [] ;
  aux_target = [];
  _all = false;
  roles: RolUserForRegisterResult[] = []
  id: number;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    private rolService: RolService,
    private alertify: AlertifyService,
    private activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.source = [];
      this.target = [];

      rolService.getAll().subscribe(list => {
        list.forEach(element => {
          this.aux_source.push(element.alias);
        });
        this.source = this.aux_source;
      });

      rolService.getRolesForUser(data["id"]).subscribe(list => {
        list.forEach(element => {
          this.aux_target.push(element.descripcion)
        });
        this.target =  this.aux_target
      });

    }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Save(id){

    this.roles = [];
    this.target.forEach(element=> {
      this.roles.push({ 
        UserId: id,
        Alias: element
         });
     });
    
     this.rolService.saveRoles(this.roles,id ).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.dialogRef.close();
    });
    
  }
}


@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  templateUrl: './modal.eliminar.html',
  encapsulation: ViewEncapsulation.None,
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}


declare var $: any;



@Component({
  selector: 'app-listausuarios',
  templateUrl: './listausuarios.component.html',
  styleUrls: ['./listausuarios.component.css']
})
export class ListausuariosComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  animal: string;
  name: string;
  public loading = false;
  
  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  
  listData: MatTableDataSource<User>;
  users: User[];
  user : User;
  pageSizeOptions:number[] = [10, 25, 50, 100];
  displayedColumns: string[] = [ 'Id','username', 'nombreCompleto' ,'email', 'Dni', 'lastActive' ,'nombreEstado','enLinea','actionsColumn' ];
  closeResult: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router
    ,private _modalService: NgbModal,
    public dialog: MatDialog) { 
     // overlayContainer.getContainerElement().classList.add('app-dark-theme');
    }

  ngOnInit() {
    this.loading = true;

    this.userService.getUsers().subscribe(list => {
      
      this.users = list;
     this.loading = false;
    this.listData = new MatTableDataSource(this.users);
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
    //$("html,body").animate({ scrollTop: 100 }, "slow");
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  openDialog(id: any): void {
    
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '650px',
      height: '400px',
      data: {id: id }
    });

    

    dialogRef.afterClosed().subscribe(result => {
      
      this.animal = result;
    });
  }
  open(user: any) {
    const modal =  this._modalService.open(NgbdModalConfirmAutofocus, { windowClass: 'danger-modal' });
    modal.componentInstance.model = user;

     modal.result.then((result) => {
      this.closeResult = `${result}`;
      
      if(this.closeResult == "Ok")
      {
          user.EstadoId = 3;
          this.userService.actualizarEstado(user).subscribe(resp => { 
            }, error => {
              
              this.alertify.error(error);
            }, () => { 
              this.userService.getUsers().subscribe(list => {
                this.users = list;
              this.listData = new MatTableDataSource(this.users);
              this.listData.paginator = this.paginator;
              this.listData.sort = this.sort;
              
              
          }); 
        })
       }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
         
      });
    

  }
  applyFilter() {
    
    this.listData.filter = this.searchKey.trim().toLowerCase();
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
  selectedRowIndex: number = -1;

  highlight(row){
      this.selectedRowIndex = row.id;
  }
  edit(id){
     this.router.navigate(['/editarusuario',id]);
    
    // this.userService.getUser(row).subscribe(resp => { 
    // }, error => {
    //    this.alertify.error(error);
    // }, () => { 
    
    // });


  }
}





