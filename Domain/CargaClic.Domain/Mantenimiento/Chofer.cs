using CargaClic.Common;

namespace CargaClic.Domain.Mantenimiento
{
    public class Chofer : Entity
    {
        public int Id { get; set; }
        public string NombreCompleto { get; set; }
        public string Dni { get; set; }
        public string Brevete { get; set; }
        public string Telefono { get; set; }

    }
}