

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
    public class ObtenerOrdenReciboQuery : IQueryHandler<ObtenerOrdenReciboParameter>
    {
        private readonly IConfiguration _config;
        public ObtenerOrdenReciboQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ObtenerOrdenReciboParameter parameters)
        {
           var parametros = new DynamicParameters();
           parametros.Add("Id", dbType: DbType.Guid, direction: ParameterDirection.Input, value: parameters.Id);

            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
   

                var result = new ObtenerOrdenReciboResult();
                var multiquery = conn.QueryMultiple
                  (
                      commandType: CommandType.StoredProcedure,
                      sql: "Recepcion.pa_obtenerOrdenrecibo",
                      param: parametros
                  );

                result = multiquery.Read<ObtenerOrdenReciboResult>().LastOrDefault();
                if (result != null)
                {
                    var detalleOrdenRecibo = multiquery.Read<ListarOrdenReciboDetalleDto>().ToList();
                    result.Detalles = detalleOrdenRecibo;
                }

                return result;
            }
        }
    }
}