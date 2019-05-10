using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarEquipoTransporteParameter : QueryParameter
    {
        public int? EstadoId {get;set;}        
        public int? PropietarioId {get;set;}
        public int? DaysAgo {get;set;}
    }
}