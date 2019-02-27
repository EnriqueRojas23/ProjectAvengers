using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Parameters.Seguridad
{
    public class ListarRolesPorUsuarioParameter : QueryParameter
    {
        public int UserId { get; set; }
    }
}

