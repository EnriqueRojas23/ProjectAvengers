using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarProveedorParameter : QueryParameter
    {
        public string Criterio { get; set; }
        
    }
}