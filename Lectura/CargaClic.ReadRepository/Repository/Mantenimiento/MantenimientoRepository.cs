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

        public async Task<IEnumerable<GetAllPropietariosResult>> GetAllPropietarios(string Criterio)
        {
            var parametros = new DynamicParameters();
            parametros.Add("criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: Criterio);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_propietarios]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllPropietariosResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllPropietariosResult>> GetAllClientes(string Criterio)
        {
            var parametros = new DynamicParameters();
            parametros.Add("criterio", dbType: DbType.String, direction: ParameterDirection.Input, value: Criterio);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_clientes]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllPropietariosResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllHuellaResult>> GetAllHuella(Guid ProductoId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("ProductoId", dbType: DbType.Guid, direction: ParameterDirection.Input, value: ProductoId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listarhuellasxproducto]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllHuellaResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
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

        public async Task<GetAllHuellaResult> GetHuella(int HuellaId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("HuellaId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: HuellaId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_obtenerhuella]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllHuellaResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result.SingleOrDefault();
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

        public async Task<IEnumerable<GetAllPropietariosResult>> GetAllClientesxPropietarios(int id)
        {
            var parametros = new DynamicParameters();
            parametros.Add("propietarioid", dbType: DbType.Int32, direction: ParameterDirection.Input, value: id);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listarclientesxpropietario]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllPropietariosResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllDireccionesResult>> GetAllDirecciones(int ClienteId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("idcliente", dbType: DbType.Int32, direction: ParameterDirection.Input, value: ClienteId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_direccionesxcliente]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllDireccionesResult>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllDepartamentos>> GetAllDepartamentos()
        {
            var parametros = new DynamicParameters();
            
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_departamento]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllDepartamentos>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllProvincias>> GetAllProvincias(int DepartamentoId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("iddepartamento", dbType: DbType.Int32, direction: ParameterDirection.Input, value: DepartamentoId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_provincia]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllProvincias>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }

        public async Task<IEnumerable<GetAllDistritos>> GetAllDistritos(int ProvinciaId)
        {
            var parametros = new DynamicParameters();
            parametros.Add("idprovincia", dbType: DbType.Int32, direction: ParameterDirection.Input, value: ProvinciaId);
            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Mantenimiento].[pa_listar_distrito]";
                conn.Open();
                var result = await conn.QueryAsync<GetAllDistritos>(sQuery, parametros ,commandType:CommandType.StoredProcedure);
                return result;
            }
        }
    }
}