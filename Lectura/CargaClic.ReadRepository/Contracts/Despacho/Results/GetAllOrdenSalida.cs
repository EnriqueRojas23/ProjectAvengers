using System;
using System.Collections.Generic;

namespace CargaClic.ReadRepository.Contracts.Despacho.Results
{
    public class GetAllOrdenSalida
    {
        

        public Int64 OrdenSalidaId { get; set; }
        public string NumOrden { get; set; }
        public int PropietarioId { get; set; }
        public string Propietario { get; set; }
        public int AlmacenId { get; set; }
        public string Almacen { get; set; }
        public string GuiaRemision { get; set; }
        public DateTime FechaRequerida { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int EstadoID { get; set; }
        public string NombreEstado { get; set; }

        public string HoraRequerida { get; set; }
        public string transportista { get; set; }
        public string placa { get; set; }
        public string equipotransporte { get; set; }
        public string urgente { get; set; }
        public string chofer { get; set; }
        public string Ubicacion { get; set; }
        public IEnumerable<GetAllOrdenSalidaDetalle> Detalles { get;set; }

    }
}