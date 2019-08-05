using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Facturacion
{
    public class Comprobante : Entity
    {
        [Key]
        public long Id { get; set; }
        public string NumeroComprobante { get; set; }
        public int? TipoComprobanteId { get; set; }
        public int? EmisionRapida { get; set; }
        public long? PreliquidacionId { get; set; }
        public int? ClienteId { get; set; }
        public DateTime? FechaEmision { get; set; }
        public int? UsuarioRegistroId { get; set; }
        public decimal? SubTotal { get; set; }
        public decimal? Igv { get; set; }
        public decimal? Total { get; set; }
        public string Motivo { get; set; }
        public string Descripcion { get; set; }
        public long? FacturaVinculadaId { get; set; }
        public int? EstadoId { get; set; }
        public string OrdenCompra { get; set; }

    }
}