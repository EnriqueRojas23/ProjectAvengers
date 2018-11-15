using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Data.Domain.Seguridad;
using System.Collections.Generic;
using System.Linq.Expressions;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Data.Contracts.Parameters.Seguridad;

namespace CargaClic.Handlers.Seguridad
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}