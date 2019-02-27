using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarProductosParameter : QueryParameter
    {
        public string Criterio { get; set; }
        public int ClienteId {get;set;}
        
    }
}