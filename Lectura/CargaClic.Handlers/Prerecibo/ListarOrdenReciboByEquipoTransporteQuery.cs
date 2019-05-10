

using System.Data;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Prerecibo;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Precibo
{
    public class ListarOrdenReciboByEquipoTransporteQuery : IQueryHandler<ListarOrdenReciboByEquipoTransporteParameter>
    {
        private readonly IConfiguration _config;
        public ListarOrdenReciboByEquipoTransporteQuery(IConfiguration config)
        {
            _config = config;   
            
        }
        public QueryResult Execute(ListarOrdenReciboByEquipoTransporteParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("EquipoTransporteId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.EquipoTransporteId);
                 var result = new ListarOrdenReciboByEquipoTransporteResult();
                 result.Hits =  conn.Query<ListarOrdenReciboByEquipoTransporteDto>("Recepcion.pa_listarordenesreciboByEquipoTransporte"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}