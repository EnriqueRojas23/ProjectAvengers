using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Seguridad
{
    public class Pagina
    {

        public int Id { get; set; }
        public string Codigo { get; set; }
        public string CodigoPadre { get; set; }
        public string Descripcion { get; set; }
        public string Link { get; set; }
        public int Nivel { get; set; }
        public int Orden { get; set; }
        public string Icono { get; set; }
        public ICollection<RolPagina> RolPaginas {get;set;}

    }
}