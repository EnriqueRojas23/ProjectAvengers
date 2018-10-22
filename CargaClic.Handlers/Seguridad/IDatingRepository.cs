using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Data.Seguridad;

namespace CargaClic.Handlers.Seguridad
{
    public interface IRepository<T> where T : Entity 
    {
         void Add(T entity) ;
         void Delete(T entity);
         Task<bool> SaveAll();
         Task<T> Get(Expression<Func<T, bool>> predicate);
         Task<IEnumerable<T>> GetAll();
         Task<User> GetUser(int id);
    }
}