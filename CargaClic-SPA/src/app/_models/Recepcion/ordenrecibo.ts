export interface OrdenRecibo {
     OrdenReciboId	:  any ;
     numOrden	:  string ;
     propietarioId	:  number ;
     propietario	:  string ;
     AlmacenID	:  number ;
     Almacen	:  string ;
     GuiaRemision	:  string ;
     FechaEsperada	:  Date ;
     FechaRegistro	:  Date ;
     EstadoID	:  number ;
     NombreEstado:  string ;
     ubicacion: string;
     detalles: OrdenReciboDetalle[];
}

export interface OrdenReciboDetalle {
     id?: number;
     OrdenReciboId: number;
     linea: string;
     ProductoId: any;
     producto: string;
     Lote: string;
     HuellaId: number;
     FechaRegistro?: Date;
     EstadoId: number;
     cantidad: number;

}

