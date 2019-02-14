import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/_models/user';
import { DataSource } from '@angular/cdk/collections';
import {MatPaginator, MatTableDataSource, MatSort , MatFormField   } from '@angular/material';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Profile deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete <span class="text-primary">"John Doe"</span> profile?</strong></p>
    <p>All information associated to this user profile will be permanently deleted.
    <span class="text-danger">This operation can not be undone.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'ngbd-modal-confirm-autofocus',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Eliminación de Usuario</h4>
    <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>¿Está seguro que desea eliminar al usuario <span class="text-primary">{{user.nombreCompleto}}</span> ?</strong></p>
    <p>Si desea bloquear al usuario dirijase a la edición del usuario.
    <span class="text-danger">Esta operación no se puede deshacer.</span>
    </p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel')">Cancel</button>
    <button type="button" ngbAutofocus class="btn btn-danger" (click)=" modal.close('Ok')">Ok</button>
  </div>
  `
})
export class NgbdModalConfirmAutofocus {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS = {
  focusFirst: NgbdModalConfirm,
  autofocus: NgbdModalConfirmAutofocus
};




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

  withAutofocus = `<button type="button" ngbAutofocus class="btn btn-danger"
      (click)="modal.close('Ok click')">Ok</button>`;

  
  listData: MatTableDataSource<User>;
  users: User[];
  pageSizeOptions:number[] = [5, 10, 25, 50, 100];
  displayedColumns: string[] = [ 'Id','username', 'nombreCompleto' ,'email', 'Dni', 'lastActive' ,'nombreEstado','enLinea','actionsColumn' ];
  closeResult: string;

  constructor(private userService: UserService, private alertify: AlertifyService, private router: Router
    ,private _modalService: NgbModal) { }

  ngOnInit() {

    this.userService.getUsers().subscribe(list => {
      this.users = list;

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
    $("html,body").animate({ scrollTop: 100 }, "slow");
  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  open(id: any) {
    const modal =  this._modalService.open(NgbdModalConfirmAutofocus);
    modal.componentInstance.user = id;


     modal.result.then((result) => {
      this.closeResult = `${result}`;
      console.log(this.closeResult);
      console.log(id);
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      console.log(this.closeResult);
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
    //   console.log('lo logre');
    // });


  }
}







