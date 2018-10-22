using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CargaClic.Data.Seguridad
{
    public class Rol
    {

        public int Id  { get; set; }
        public string Descripcion { get; set; }
        public string Alias { get; set; }
        public bool Activo { get; set; }
        public bool Publico { get; set; }   
        public ICollection<RolPagina> RolPaginas {get;set;}

        
    }
}