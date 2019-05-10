export interface InventarioGeneral {
     id:  number ;
     lodNum:  string ;
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
     huellaId: number;
     codigoHuella: string;
}
