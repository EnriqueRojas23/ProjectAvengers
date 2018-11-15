namespace CargaClic.Data.Domain.Seguridad
{
    public class RolPagina
    {
        public int IdRol { get; set; }
        public Rol Rol { get; set; }
        public Pagina Pagina { get; set; }
        public int IdPagina { get; set; }
        public string permisos { get; set; }    
    }
}