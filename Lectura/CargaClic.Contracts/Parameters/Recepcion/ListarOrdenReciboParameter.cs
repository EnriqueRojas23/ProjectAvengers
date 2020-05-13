using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Prerecibo
{
    public class ListarOrdenReciboParameter : QueryParameter
    {
        public int? PropietarioId { get; set; }
        public int? EstadoId {get;set;}
        public int? DaysAgo { get;set; }
        public string fec_ini {get;set;}
        public string fec_fin {get;set;}
        public int? AlmacenId  {get;set;}
    }
}