using System;

namespace CargaClic.Domain.Inventario
{
    public class InvLod
    {
        public long Id {get;set;}
        public string LodNum {get;set;}
        public int? UbicacionId {get;set;}
        public int? UbicacionProxId {get;set;}
        public DateTime FechaHoraRegistro {get;set;}
    }
}