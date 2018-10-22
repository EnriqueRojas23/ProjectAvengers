using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Data.Seguridad;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Seguridad
{
    public class Repository<T> : IRepository<T> where T : Entity
    {
        private readonly DataContext _context;
        private readonly DbSet<T> dbSet; //here
        private readonly IConfiguration _config;

        public Repository(DataContext context,IConfiguration config)
        {
            _context = context;
            dbSet = _context.Set<T>();
             _config = config;

        }
         public IDbConnection Connection
        {
        get
        {
            return new SqlConnection(_config.GetConnectionString("DefaultConnection"));
        }
        }
        public void Add(T entity)
        {
           _context.Add(entity);
        }

        public void Delete(T entity)
        {
            _context.Remove(entity);
        }
        public async Task<T> Get(Expression<Func<T, bool>> predicate) 
        {
            return await dbSet.Where(predicate).SingleOrDefaultAsync();
        }
        public async Task<IEnumerable<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<User> GetUser (int id)
        {
            var parametros = new DynamicParameters();
            parametros.Add("idtipoproducto", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idtipoproducto);
            parametros.Add("idnivelreparacion", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idnivelreparacion);
            parametros.Add("idpartner", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.idpartner);


            using (IDbConnection conn = Connection)
            {
                string sQuery = "select id,Username, Nombre, Email, DateOfBirth, Created, LastActive from seguridad.users  where id = @ID";
                conn.Open();
                var result = await conn.QueryAsync<User>(sQuery, parametros ,  commandType: CommandType.StoredProcedure );
                //var result2 = await conn.Query<User>("",param ,commandType:CommandType.StoredProcedure);
                return result.FirstOrDefault();
            }
        }
    }
}