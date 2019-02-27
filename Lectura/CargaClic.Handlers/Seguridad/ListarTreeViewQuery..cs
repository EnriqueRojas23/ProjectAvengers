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
    public class ListarTreeViewQuery : IQueryHandler<ListarTreeViewParameter>
    {
        private readonly IConfiguration _config;
        public ListarTreeViewQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarTreeViewParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("IdRol", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.idRol);
                 var result = new TreeviewItemResult();
                 result.Hits =  conn.Query<TreeviewItem>("seguridad.pa_listarTreeView"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}