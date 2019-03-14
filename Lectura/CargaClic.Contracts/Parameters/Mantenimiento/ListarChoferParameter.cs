using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarChoferParameter : QueryParameter
    {
        public string Criterio { get; set; }
        
    }
}