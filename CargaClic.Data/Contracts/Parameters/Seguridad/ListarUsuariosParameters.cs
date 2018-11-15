using System;
using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Parameters.Seguridad
{
    public class ListarUsuariosParameters: QueryParameter
    {
        public int? Id {get;set;}
        public string Username { get; set; }
        public string Nombre { get; set; }
    }
}