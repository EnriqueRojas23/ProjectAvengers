using System.Data;
using System.Threading.Tasks;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Seguridad
{
    public class ListarRolesPorUsuarioQuery : IQueryHandler<ListarRolesPorUsuarioParameter>
    {
        private readonly IConfiguration _config;
        public ListarRolesPorUsuarioQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarRolesPorUsuarioParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("UserId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.UserId);
                 var result = new ListarRolesPorUsuarioResult();
                 result.Hits =  conn.Query<ListarRolesPorUsuarioDto>("seguridad.pa_listarrolesxusuario"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}