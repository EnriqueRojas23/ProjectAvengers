

using System.Data;
using CargaClic.Contracts.Parameters.Inventario;
using CargaClic.Contracts.Results.Inventario;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Inventario
{
    public class ListarInventarioQuery : IQueryHandler<ListarInventarioParameter>
    {
        private readonly IConfiguration _config;
        public ListarInventarioQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarInventarioParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("OrdenReciboId", dbType: DbType.Guid, direction: ParameterDirection.Input, value: parameters.Id);
                 var result = new ListarInventarioResult();
                 result.Hits =  conn.Query<ListarInventarioDto>("Inventario.pa_listarinventario_mix"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}