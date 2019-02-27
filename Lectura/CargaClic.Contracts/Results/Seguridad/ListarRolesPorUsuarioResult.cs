using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Results.Seguridad
{
    public class ListarRolesPorUsuarioResult : QueryResult 
    {
        public IEnumerable<ListarRolesPorUsuarioDto> Hits { get; set; }
    }
    public class ListarRolesPorUsuarioDto
    {
        public int UserID {get;set;}
        public int RolID	{ get;set; }
        public string Descripcion	{ get;set; }       
    }
  
}