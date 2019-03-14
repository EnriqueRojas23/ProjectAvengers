using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarPlacasParameter : QueryParameter
    {
        public string Criterio { get; set; }
        
    }
}