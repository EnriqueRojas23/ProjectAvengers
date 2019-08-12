using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Domain.Despacho;
using CargaClic.ReadRepository.Contracts.Despacho.Results;
using CargaClic.ReadRepository.Interface.Despacho;

using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.ReadRepository.Repository.Despacho
{
    public class DespachoReadRepository : IDespachoReadRepository
    {
            private readonly DataContext _context;
            private readonly IConfiguration _config;

            public DespachoReadRepository(DataContext context,IConfiguration config)
            {
                _context = context;
                _config = config;
            }
            public IDbConnection Connection
            {   
                get
                {
                    return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                }
            }

        public async Task<IEnumerable<GetAllOrdenSalida>> GetAllOrdenSalida(int PropietarioId, int EstadoId, int DaysAgo)
        {
            var parametros = new DynamicParameters();
            parametros.Add("PropietarioId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: PropietarioId);
            parametros.Add("EstadoId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: EstadoId);
            parametros.Add("DaysAgo", dbType: DbType.Int64, direction: ParameterDirection.Input, value: DaysAgo);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listar_ordenessalida]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllOrdenSalida>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<GetAllOrdenSalidaDetalle>> GetAllOrdenSalidaDetalle(long OrdenSalidaId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("Id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: OrdenSalidaId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[obtener_ordenrecibodetalle]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllOrdenSalidaDetalle>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }

        public async Task<GetAllOrdenSalida> GetOrdenSalida(long OrdenSalidaId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("Id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: OrdenSalidaId);
            var result = new GetAllOrdenSalida();

            using (IDbConnection conn = Connection)
            {
                var multiquery = await conn.QueryMultipleAsync
                  (
                      commandType: CommandType.StoredProcedure,
                      sql: "Despacho.pa_obtener_ordensalida",
                      param: parametros
                  );

                result = multiquery.Read<GetAllOrdenSalida>().LastOrDefault();
                if (result != null)
                {
                    var detalleOrdenRecibo = multiquery.Read<GetAllOrdenSalidaDetalle>().ToList();
                    result.Detalles = detalleOrdenRecibo;
                }
            }
            return result;
           

        }
        public async Task<IEnumerable<GetAllCargas>> GetAllCargas(int PropietarioId, int EstadoId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("PropietarioId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: PropietarioId);
            parametros.Add("EstadoId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: EstadoId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listar_cargas]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllCargas>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
            
           

        }

        public async Task<IEnumerable<GetAllOrdenSalida>> GetAllOrdenSalidaPendiente(int PropietarioId, int EstadoId, int DaysAgo)
        {
             var parametros = new DynamicParameters();
            parametros.Add("PropietarioId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: PropietarioId);
            parametros.Add("EstadoId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: EstadoId);
            parametros.Add("DaysAgo", dbType: DbType.Int64, direction: ParameterDirection.Input, value: DaysAgo);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listar_ordenessalida_pendiente]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllOrdenSalida>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<ListarTrabajoResult>> ListarTrabajo( int PropietarioId, int EstadoId )
        {
            var parametros = new DynamicParameters();
            parametros.Add("PropietarioId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: PropietarioId);
            parametros.Add("EstadoId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: EstadoId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listarTrabajo]";
                conn.Open();
                var result = await conn.QueryAsync<ListarTrabajoResult>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<ListarTrabajoDetallesResult>> ListarTrabajoDetalle(long WrkId)
        {
             var parametros = new DynamicParameters();
            parametros.Add("WrkId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: WrkId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listartareadetalles]";
                conn.Open();
                var result = await conn.QueryAsync<ListarTrabajoDetallesResult>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<PendienteCargaResult>> ListarPendienteCarga()
        {
             var parametros = new DynamicParameters();
            

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listar_pendientescarga]";
                conn.Open();
                var result = await conn.QueryAsync<PendienteCargaResult>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<ListarShipmentResult>> ListarPickingPendiente()
        {
              var parametros = new DynamicParameters();
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listarpickingpendiente]";
                conn.Open();
                var result = await conn.QueryAsync<ListarShipmentResult>(sQuery,
                                                                    parametros
                                                                    ,commandType:CommandType.StoredProcedure
                  ); 
                return result;
            }
        }

        public async Task<IEnumerable<ListarShipmentDetalleResult>> ListarPickingPendienteDetalle(long ShipmentId)
        {
             var parametros = new DynamicParameters();
            parametros.Add("ShipmentId", dbType: DbType.Int64, direction: ParameterDirection.Input, value: ShipmentId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Despacho].[pa_listarpickingpendientedetalle]";
                conn.Open();
                var result = await conn.QueryAsync<ListarShipmentDetalleResult>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }
    }
}