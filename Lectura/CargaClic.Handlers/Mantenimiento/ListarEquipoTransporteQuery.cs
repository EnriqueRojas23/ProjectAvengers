

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
    public class ListarEquipoTransporteQuery : IQueryHandler<ListarEquipoTransporteParameter>
    {
        private readonly IConfiguration _config;
        public ListarEquipoTransporteQuery(IConfiguration config)
        {
            _config = config;   
        }
        public QueryResult Execute(ListarEquipoTransporteParameter parameters)
        {
            using (var conn = new ConnectionFactory(_config).GetOpenConnection())
            {
                  var parametros = new DynamicParameters();
                  parametros.Add("fecini", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fec_ini);
                  parametros.Add("fecfin", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.fec_fin);
                  parametros.Add("EstadoId", dbType: DbType.Int16, direction: ParameterDirection.Input, value: parameters.EstadoId);
                  parametros.Add("PropietarioId", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.PropietarioId);
                  parametros.Add("AlmacenId", dbType: DbType.String, direction: ParameterDirection.Input, value: parameters.AlmacenId);

                  var result = new ListarEquipoTransporteResult();
                    result.Hits =  conn.Query<ListarEquipoTransporteDto>("Mantenimiento.pa_listarequipotransportes_v"
                                                                        ,parametros
                                                                        ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}