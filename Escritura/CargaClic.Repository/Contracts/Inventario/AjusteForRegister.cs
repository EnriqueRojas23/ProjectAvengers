using System;

namespace CargaClic.Repository.Contracts.Inventario
{
    public class AjusteForRegister
    {
        public long InventarioId { get; set; }
        public string LodNum { get; set; }
        public DateTime FechaHoraAjuste { get; set; }
        public int UntQty { get; set; }
        public int EstadoId { get; set; }
        public DateTime? FechaExpire { get; set; }
        public DateTime? FechaManufactura { get; set; }
        public int UbicacionId { get; set; }
        public string LotNum { get; set; }
        public DateTime FechaIngreso { get; set; }  
    }
}