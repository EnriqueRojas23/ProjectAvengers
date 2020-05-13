using System.Collections.Generic;
using CargaClic.Common;
using CargaClic.Domain.Inventario;

namespace CargaClic.Domain.Mantenimiento
{
    public class Ubicacion : Entity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int? AreaId { get; set; }
        public decimal height { get; set; }
        public decimal length { get; set; }
        public decimal width { get; set; }
        public int AlmacenId { get; set; }
        public int EstadoId {get;set;}
        public int TipoUbicacionId{get;set;}
        public ICollection<InvLod> invlod {get;set;}
    }
}