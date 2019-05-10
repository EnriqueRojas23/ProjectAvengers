

using System.Data;
using System.Linq;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Prerecibo;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Precibo
{
    public class ObtenerOrdenReciboDetalleQuery : IQueryHandler<ObtenerOrdenReciboDetalleParameter>
    {
        private readonly IConfiguration _config;
        public ObtenerOrdenReciboDetalleQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ObtenerOrdenReciboDetalleParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("Id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.Id);
                 return conn.Query<ObtenerOrdenReciboDetalleResult>
                  (
                      commandType: CommandType.StoredProcedure,
                      sql: "Recepcion.obtener_ordenrecibodetalle",
                      param: parametros
                  ).SingleOrDefault();
            }
        }
    }
}

