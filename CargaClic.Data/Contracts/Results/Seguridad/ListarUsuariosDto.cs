using System;
using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Results.Seguridad
{
    public class ListarUsuariosResult : QueryResult
    {
        public IEnumerable<ListarUsuariosDto> Hits { get;set; }
    }
    public class ListarUsuariosDto 
    {
        public int Id {get;set;}
        public string Username { get; set; }
        public string Nombre { get; set; }
        public string Email {get;set;}
        public bool EnLinea { get; set; }
        public string Estado { get; set; }
        public int Edad { get; set; }
        public DateTime DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        
    }
}