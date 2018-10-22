using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Data.Seguridad;

namespace CargaClic.Handlers.Seguridad
{
    public interface IAuthRepository
    {
        Task<User> Register(User user, string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExists(string username);
    }
}