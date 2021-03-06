

using System.Data;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Prerecibo;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Precibo
{
    public class ListarOrdenReciboQuery : IQueryHandler<ListarOrdenReciboParameter>
    {
        private readonly IConfiguration _config;
        public ListarOrdenReciboQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarOrdenReciboParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("EstadoId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.EstadoId);
                 parametros.Add("PropietarioId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.PropietarioId);
                 parametros.Add("DaysAgo", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.DaysAgo);
                 var result = new ListarOrdenReciboResult();
                 result.Hits =  conn.Query<ListarOrdenReciboDto>("Recepcion.pa_listarordenesrecibo"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}