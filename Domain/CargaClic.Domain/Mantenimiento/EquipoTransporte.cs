using System;
using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class EquipoTransporte : Entity
    {
        public long Id { get; set; }
        public string Codigo { get; set; }
        public int ProveedorId { get; set; }
        public int VehiculoId { get; set; }
        public int ChoferId { get; set; }
        public string GuiaTransportista { get; set; }
        public int EstadoId {get;set;}
        public int? PuertaId {get;set;}
        public int PropietarioId {get;set;}
        public DateTime FechaRegistro {get;set;}

    }
}