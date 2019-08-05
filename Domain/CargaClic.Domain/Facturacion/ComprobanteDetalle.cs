using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Facturacion
{
    public class ComprobanteDetalle : Entity
    {
        [Key]
        public long Id { get; set; }
        public long? ComprobanteId { get; set; }
        public long? InventarioId { get; set; }
        public string Descripcion { get; set; }
        public decimal? Subtotal { get; set; }
        public decimal? Igv { get; set; }
        public decimal? Total { get; set; }
        public decimal? Recargo { get; set; }
    }
}