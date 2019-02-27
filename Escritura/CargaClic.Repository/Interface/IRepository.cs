using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Prerecibo;
using CargaClic.Domain.Seguridad;

namespace CargaClic.Data.Interface
{
    public interface IRepository<T> where T : Entity 
    {
         Task<T> AddAsync(T entity) ;
         void Delete(T entity);
         void DeleteAll(IEnumerable<T> entity);
         Task<bool> SaveAll();
         Task<T> Get(Expression<Func<T, bool>> predicate);
         Task<IEnumerable<T>> GetAll(Expression<Func<T, bool>> predicate);
         Task<IEnumerable<T>> GetAll();
         Task<User> GetUser(int id);
         Task<OrdenRecibo> GetMaxNumOrdenRecibo();
    }
}