using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Results.Seguridad
{
    public class ListarMenusxRolResult : QueryResult 
    {
        public IEnumerable<ListarMenusxRolDto> Hits { get; set; }
    }
    public class ListarMenusxRolDto
    {
        public int Id {get;set;}
        public string Codigo	{ get;set; }
        public string CodigoPadre	{ get;set; }
        public string Descripcion	{ get;set; }
        public string Link	{ get;set; }
        public string Nivel	{ get;set; }
        public string Orden	{ get;set; }
        public string Icono	{ get;set; }        
        public string srp_seleccion { get;set; }
        public bool visible {get;set;}
        public List<ListarMenusxRolDto> submenu {get;set;}

    }

   



 
}