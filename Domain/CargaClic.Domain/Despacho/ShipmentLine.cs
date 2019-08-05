using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class ShipmentLine : Entity
    {
        [Key]
        public long Id { get; set; }
        public long? ShipmentId { get; set; }
        public Guid? ProductoId { get; set; }
        public int? HuellaId { get; set; }
        public int? Cantidad { get; set; }
        public int? UnidadMedidaId { get; set; }
        public int? EstadoId { get; set; }
        public long? LineaId { get; set; }
        public string Lote { get; set; }
        
    }
}