using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class Carga : Entity
    {
        public long Id { get; set; }
        public string NumCarga { get; set; }
        public DateTime? FechaRegistro { get; set; }
        public DateTime? FechaAsignacion { get; set; }
        public DateTime? FechaDespacho { get; set; }
        public int? UsuarioRegistroId { get; set; }
        public long? EquipoTransporteId { get; set; }
        public decimal? Volumen { get; set; }
        public decimal? Peso { get; set; }
        public int EstadoId { get; set; }

    }
}