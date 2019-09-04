using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.ReadRepository.Contracts.Despacho.Results;
using CargaClic.ReadRepository.Interface.Facturacion;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.ReadRepository.Repository.Despacho
{
    public class FacturacionReadRepository : IFacturacionReadRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public FacturacionReadRepository(DataContext context,IConfiguration config)
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
        public  async Task<IEnumerable<GetPendientesLiquidacion>> GetPendientesLiquidacion(int ClienteId,
        string corteinicio, string cortefin)
        {
            var parametros = new DynamicParameters();
            parametros.Add("PropietarioId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: ClienteId);
            parametros.Add("strcorteinicio", dbType: DbType.String, direction: ParameterDirection.Input, value: corteinicio);
            parametros.Add("strcortefin", dbType: DbType.String, direction: ParameterDirection.Input, value: cortefin);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Facturacion].[pa_listarpendientespreliquidacion]";
                conn.Open();
                var result = await conn.QueryAsync<GetPendientesLiquidacion>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }

        public async Task<IEnumerable<GetLiquidaciones>> GetPreLiquidaciones(int ClienteId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("ClienteId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: ClienteId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Facturacion].[pa_listarliquidaciones]";
                conn.Open();
                var result = await conn.QueryAsync<GetLiquidaciones>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }
        public async Task<IEnumerable<GetLiquidaciones>> GetPreLiquidacion(int Preliquidacion)
        {
            var parametros = new DynamicParameters();
            parametros.Add("Id", dbType: DbType.Int32, direction: ParameterDirection.Input, value: Preliquidacion);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Facturacion].[pa_obtenerliquidacion]";
                conn.Open();
                var result = await conn.QueryAsync<GetLiquidaciones>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
                return result;
            }
        }
    }
}