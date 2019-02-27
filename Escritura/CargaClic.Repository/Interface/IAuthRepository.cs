using System.Threading.Tasks;
using CargaClic.Data;
using System.Collections.Generic;
using System.Linq.Expressions;

using CargaClic.Domain.Seguridad;

namespace CargaClic.Data.Interface
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Update(User user);
        Task<User> UpdateEstadoId(User user);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}