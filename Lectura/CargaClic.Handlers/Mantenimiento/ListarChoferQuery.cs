

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
    public class ListarChoferQuery : IQueryHandler<ListarChoferParameter>
    {
        private readonly IConfiguration _config;
        public ListarChoferQuery(IConfiguration config)
        {
            _config = config;   
        }
        public QueryResult Execute(ListarChoferParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("Criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Criterio);
                 
                 var result = new ListarChoferResult();
                 result.Hits =  conn.Query<ListarChoferDto>("Mantenimiento.pa_buscarchofer"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}