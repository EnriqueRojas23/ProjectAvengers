using System;
using System.Collections.Generic;

namespace CargaClic.Repository.Contracts.Despacho
{
    public class AuxOrden
    {
        public Int64 OrdenSalidaId { get; set; }
        public string NumOrden { get; set; }
        public int PropietarioId { get; set; }
        public string Propietario { get; set; }
        public int AlmacenId { get; set; }
        public string Almacen { get; set; }
        public string GuiaRemision { get; set; }
        public DateTime FechaEsperada { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int EstadoID { get; set; }
        public string NombreEstado { get; set; }

        public string HoraEsperada { get; set; }
        public string transportista { get; set; }
        public string placa { get; set; }
        public string equipotransporte { get; set; }
        public string urgente { get; set; }
        public string chofer { get; set; }
        public string Ubicacion { get; set; }
        public IEnumerable<AuxOrdenDetalle> Detalles { get;set; }
    }

    public class AuxOrdenDetalle
    {
        public Int64 Id {get;set;}
        public Int64 OrdenSalidaId {get;set;}
        public string Linea {get;set;}
        public string Codigo {get;set;}
        public Guid ProductoId {get;set;}
        public string Producto {get;set;}
        public string Lote {get;set;}
        public int? HuellaId {get;set;}
        public int EstadoId {get;set;}
        public string Estado {get;set;}
        public int? Cantidad {get;set;}
    }
}