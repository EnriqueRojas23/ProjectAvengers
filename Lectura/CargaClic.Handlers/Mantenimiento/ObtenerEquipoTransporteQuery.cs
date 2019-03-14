

using System.Data;
using System.Linq;
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
    public class ObtenerEquipoTransporteQuery : IQueryHandler<ObtenerEquipoTransporteParameter>
    {
        private readonly IConfiguration _config;
        public ObtenerEquipoTransporteQuery(IConfiguration config)
        {
            _config = config;   
        }
        public QueryResult Execute(ObtenerEquipoTransporteParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                 var parametros = new DynamicParameters();
                 parametros.Add("VehiculoId", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.VehiculoId);
                 var result =  conn.Query<ObtenerEquipoTransporteResult>("Mantenimiento.pa_buscarEquipoTransporte"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure).SingleOrDefault();
                return result;
            }
        }
    }
}