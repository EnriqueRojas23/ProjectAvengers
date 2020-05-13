using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Facturacion
{
    public class Preliquidacion : Entity
    {
        [Key]
        public long Id { get; set; }
        public int? ClienteId { get; set; }
        public string NumLiquidacion {get;set;} 
        public DateTime? FechaLiquidacion { get; set; }
        public decimal? SubTotal { get; set; }
        public decimal? Igv { get; set; }
        public decimal? Total { get; set; }
        public int? AlmacenId { get; set; }
        public int EstadoId {get;set;}
        public DateTime? FechaInicio {get;set;}
        public DateTime? FechaFin{get;set;}
    }
}