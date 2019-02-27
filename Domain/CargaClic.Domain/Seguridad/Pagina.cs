using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using CargaClic.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Domain.Seguridad
{
    public class Pagina : Entity
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