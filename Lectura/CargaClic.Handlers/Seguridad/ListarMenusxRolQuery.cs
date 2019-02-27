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
    public class ListarMenusxRolQuery : IQueryHandler<ListarMenusxRolParameter>
    {
        private readonly IConfiguration _config;
        public ListarMenusxRolQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarMenusxRolParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("IdRol", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idRol);
                 var result = new ListarMenusxRolResult();
                 result.Hits =  conn.Query<ListarMenusxRolDto>("seguridad.pa_listarmenu"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}