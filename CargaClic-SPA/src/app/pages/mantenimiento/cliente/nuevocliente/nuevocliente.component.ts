import { Component, OnInit } from '@angular/core';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { NgForm } from '@angular/forms';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.css']
})
export class NuevoclienteComponent implements OnInit {
  tipodocumento: Dropdownlist[] = [];
  model: any = {}  ;
  constructor(private generalService: GeneralService, 
    private clienteService: ClienteService,
    private router: Router,
    private alertify: AlertifyService ) { }

  ngOnInit() {
    this.generalService.getValorTabla(15).subscribe(resp=> 
      {
        resp.forEach(element => {
          this.tipodocumento.push({ val: element.id , viewValue: element.valorPrincipal});
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
  
  registrar(form: NgForm) {
    if (form.invalid) {
      return; 
    }
    this.clienteService.registrarCliente(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['mantenimiento/listadocliente']);
    });

  }
  cancel(){
    this.router.navigate(['mantenimiento/listadocliente']);
  }


}
