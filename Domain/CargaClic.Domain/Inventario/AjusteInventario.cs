using System;

namespace CargaClic.Domain.Inventario
{
    public class AjusteInventario
    {
        public long Id { get; set; }
        public long InventarioId { get; set; }
        public string LodNum { get; set; }
        public DateTime FechaHoraAjuste { get; set; }
        public int UntQty { get; set; }
        public int EstadoId { get; set; }
        public DateTime? FechaExpire { get; set; }
        public DateTime? FechaManufactura { get; set; }
        public int? UbicacionId { get; set; }
        public string LotNum { get; set; }
        public DateTime FechaIngreso { get; set; }
        public Guid ProductoId { get; set; }
        public int? ClienteId { get; set; }
        public int? UsuarioRegistroId { get; set; }
        public long? LineaId { get; set; }
        public int? HuellaId { get; set; }
        public bool? Almacenado { get; set; }
        public Guid? OrdenReciboId { get; set; }

    }
}