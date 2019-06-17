using Common.QueryContracts;

namespace CargaClic.Contracts.Parameters.Prerecibo
{
    public class ListarOrdenReciboByEquipoTransporteParameter : QueryParameter
    {
        public long EquipoTransporteId { get; set; }
    }
}