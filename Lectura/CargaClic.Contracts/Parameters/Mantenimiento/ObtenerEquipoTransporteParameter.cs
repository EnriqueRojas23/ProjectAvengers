using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ObtenerEquipoTransporteParameter : QueryParameter
    {
        public int VehiculoId { get; set; }
        
    }
}