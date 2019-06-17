import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Dropdownlist } from 'src/app/_models/Constantes';
import { GeneralService } from 'src/app/_services/Mantenimiento/general.service';
import { ClienteService } from 'src/app/_services/Mantenimiento/cliente.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-nuevopropietario',
  templateUrl: './nuevopropietario.component.html',
  styleUrls: ['./nuevopropietario.component.css']
})
export class NuevopropietarioComponent implements OnInit {

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
    this.clienteService.registrarOwner(this.model).subscribe(resp => { 
    }, error => {
       this.alertify.error(error);
    }, () => { 
      this.alertify.success("Se registró correctamente.");
      this.router.navigate(['mantenimiento/listadopropietario']);
    });

  }
  cancel(){
    this.router.navigate(['mantenimiento/listadopropietario']);
  }


}
