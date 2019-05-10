using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Area : Entity
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public int? AlmacenId { get; set; }
    }
}