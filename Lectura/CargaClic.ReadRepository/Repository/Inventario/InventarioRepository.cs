using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.ReadRepository.Contracts.Inventario.Parameters;
using CargaClic.ReadRepository.Contracts.Inventario.Results;
using CargaClic.ReadRepository.Interface.Inventario;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.ReadRepository.Repository.Inventario
{
    public class InventarioReadRepository : IInventarioReadRepository
    {
            private readonly DataContext _context;
            private readonly IConfiguration _config;

            public InventarioReadRepository(DataContext context,IConfiguration config)
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
        public async Task<IEnumerable<GetAllInventarioResult>> GetAllInventario(GetAllInventarioParameters param)
        {
            var parametros = new DynamicParameters();
            parametros.Add("ProductoId", dbType: DbType.Guid, direction: ParameterDirection.Input, value: param.ProductoId);
            parametros.Add("ClienteId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: param.ClientId);
            parametros.Add("EstadoId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: param.EstadoId);
            parametros.Add("UbicacionId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: param.UbicacionId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[inventario].[pa_listainventario_ajuste]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllInventarioResult>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }

        public async Task<IEnumerable<GetAllInventarioResult>> GetAllInventarioDetalle(long Id)
        {
           var parametros = new DynamicParameters();
            parametros.Add("Id", dbType: DbType.Int64, direction: ParameterDirection.Input, value: Id);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[inventario].[pa_listainventario_ajuste_detalle]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllInventarioResult>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }
    }
}