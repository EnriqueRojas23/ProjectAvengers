using System;
using System.ComponentModel.DataAnnotations;
using CargaClic.Common;

namespace CargaClic.Domain.Despacho
{
    public class Manifiesto : Entity
    {
        [Key]
        public long Id { get; set; }
        public string NumManifiesto { get; set; }
        public DateTime FechaRegistro { get; set; }
        public int UsuarioRegistro { get; set; }
        public long EquipoTransporteId { get; set; }
        public int PropietarioId { get; set; }
        public int ClienteId { get; set; }
        public int DireccionId { get; set; }
        public int EstadoId { get; set; }
        public DateTime? FechaSalida { get; set; }
        public int UbicacionId { get; set; }

    }
}