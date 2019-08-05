using System;

namespace CargaClic.Domain.Inventario
{
    public class Kardex
    {
        public long Id { get; set; }
        public int PropietarioId { get; set; }
        public Guid ProductoId { get; set; }
        public int MovimientoId { get; set; }
        public int MotivoId { get; set; }
        public int UsuarioId { get; set; }
        public DateTime FechaRegistro { get; set; }
        public string HoraRegistro { get; set; }
        public int? EquipoTransporteId { get; set; }
        public Guid? OrdenReciboId { get; set; }
        public long? OrdenSalidaId { get; set; }
        public long? InventarioId { get; set; }

    }
}