using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class Carga : Entity
    {
        [Key]
        public long Id { get; set; }
        public string NumCarga { get; set; }
        public int PropietarioId { get; set; }
        public long? EquipoTransporteId { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string Observacion { get; set; }
        public int UsuarioRegistro { get; set; }
        public int? UsuarioAsignado { get; set; }
        public int EstadoId { get; set; }
        public DateTime? FechaConfirmacion { get; set; }
        public DateTime? FechaSalida { get; set; }
        public long? ManifiestoId { get; set; }
        public int ClienteId {get;set;}
        public int DireccionId {get;set;}
    }
}