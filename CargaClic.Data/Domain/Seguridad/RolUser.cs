namespace CargaClic.Data.Domain.Seguridad
{
    public class RolUser
    {
        public int UserId { get; set; }
        public int RolId { get; set; }
        public Rol Rol { get; set; }
        public User User { get; set; }
        
    }
}