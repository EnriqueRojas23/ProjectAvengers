using System;
using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Inventario
{
    public class ListarInventarioParameter : QueryParameter
    {
        public Guid? Id { get; set; }
        
    }
}