import { NumberSymbol } from "@angular/common";

export interface Shipment {
     id	:  number ;
     estadoId	:  number ;
     fechaRegistro: Date;
}
export interface ShipmentLine {
     id	:  number ;
     codigo	:  string ;
     producto	:  string ;
     cantidad	:  number ;
     estadoId	:  number ;
     peso: string;
     familia:  string ;
     unidadMedida: string;
     fechaRequerida: Date;
     horaRequerida: string;
     fechaRegistro: Date;
}


