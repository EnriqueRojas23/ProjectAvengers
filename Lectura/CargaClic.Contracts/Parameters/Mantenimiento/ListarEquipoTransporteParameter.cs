using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Mantenimiento
{
    public class ListarEquipoTransporteParameter : QueryParameter
    {
        public int? EstadoId {get;set;}        
        public int? PropietarioId {get;set;}
        public int? DaysAgo {get;set;}
        public string fec_ini {get;set;}
        public string fec_fin {get;set;}
        public int? AlmacenId {get;set;}

    }
}