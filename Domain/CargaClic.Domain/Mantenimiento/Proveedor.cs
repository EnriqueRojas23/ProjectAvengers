using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Proveedor : Entity
    {
        public int Id { get; set; }
        public string RazonSocial { get; set; }
        public string Ruc { get; set; }
    }
}