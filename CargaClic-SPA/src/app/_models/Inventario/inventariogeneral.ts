export interface InventarioGeneral {
     id:  number ;
     lodNum:  string ;
     lodId: number;
     productoId: any ;
     descripcionLarga:  string ;
     ubicacionId:  number ;
     ubicacion:  string ;
     lotNum:  string ;
     fechaExpire:  Date ;
     untQty:  number ;
     untPak:  number ;
     fechaRegistro:  Date ;
     fechaUltMovimiento: Date;
     usuarioIngreso: number;
     ubicacionIdUlt: number;
     ubicacionUltima: string;
     huellaId: number;
     codigoHuella: string;
}
