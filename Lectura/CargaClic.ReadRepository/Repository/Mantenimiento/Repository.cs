using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;

using CargaClic.Domain.Mantenimiento;
using CargaClic.ReadRepository.Contracts.Mantenimiento.Results;
using CargaClic.ReadRepository.Interface.Mantenimiento;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Mantenimiento
{
    public class MantenimientoRepository : IMantenimientoRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public MantenimientoRepository(DataContext context,IConfiguration config)
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

        public async Task<IEnumerable<GetAllHuelladetalleResult>> GetAllHuelladetalle(int HuellaId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("HuellaId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: HuellaId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listarhuelladetalle]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllHuelladetalleResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<GetProductoResult> GetProducto(Guid ProductoId)
        {
             var parametros = new DynamicParameters();
            parametros.Add("ProductoId", dbType: DbType.Guid, direction: ParameterDirection.Input, value: ProductoId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_obtenerproducto]";
                conn.Open();
                var result = await conn.QueryAsync<GetProductoResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result.SingleOrDefault();
            }
        }
    }
}