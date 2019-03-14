

using System.Data;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Contracts.Results.Prerecibo;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Mantenimiento
{
    public class ListarProductosQuery : IQueryHandler<ListarProductosParameter>
    {
        private readonly IConfiguration _config;
        public ListarProductosQuery(IConfiguration config)
        {
            _config = config;   
        }
        public QueryResult Execute(ListarProductosParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("Criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Criterio);
                 parametros.Add("ClienteId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.ClienteId);
                 
                 var result = new ListarProductosResult();
                 result.Hits =  conn.Query<ListarProductosDto>("Mantenimiento.pa_listarProductos"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}