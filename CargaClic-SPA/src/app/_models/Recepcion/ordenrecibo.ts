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
     ordenDetalle: OrdenReciboDetalle[];
}

export interface OrdenReciboDetalle {
     OrdenReciboDetalleId?: number;
     OrdenReciboId: number;
     Linea: string;
     ProductoId: any;
     Lote: string;
     HuellaId: number;
     FechaRegistro?: Date;
     EstadoId: number;
     cantidad: number;

}

