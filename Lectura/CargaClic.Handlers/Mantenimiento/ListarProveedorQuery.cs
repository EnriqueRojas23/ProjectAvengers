

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
    public class ListarProveedorQuery : IQueryHandler<ListarProveedorParameter>
    {
        private readonly IConfiguration _config;
        public ListarProveedorQuery(IConfiguration config)
        {
            _config = config;   
        }
        public QueryResult Execute(ListarProveedorParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("Criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.Criterio);
                 
                 var result = new ListarProveedorResult();
                 result.Hits =  conn.Query<ListarProveedorDto>("Mantenimiento.pa_buscarproveedor"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}