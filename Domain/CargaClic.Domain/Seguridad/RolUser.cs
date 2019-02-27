using CargaClic.Common;

namespace CargaClic.Domain.Seguridad
{
    public class RolUser :  Entity
    {
        public int UserId { get; set; }
        public int RolId { get; set; }
        public Rol Rol { get; set; }
        public User User { get; set; }
        
    }
}