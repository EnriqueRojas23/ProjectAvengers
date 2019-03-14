

using System.Data;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Prerecibo;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Precibo
{
    public class ListarUbicacionesQuery : IQueryHandler<ListarUbicacionesParameter>
    {
        private readonly IConfiguration _config;
        public ListarUbicacionesQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarUbicacionesParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("AlmacenId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.AlmacenId);
                 parametros.Add("AreaId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: parameters.AreaId);
                 var result = new ListarUbicacionesResult();
                 result.Hits =  conn.Query<ListarUbicacionesDto>("Mantenimiento.pa_listarUbicaciones"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}