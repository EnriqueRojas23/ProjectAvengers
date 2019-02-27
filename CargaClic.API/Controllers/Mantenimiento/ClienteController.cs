using System.Threading.Tasks;
using CargaClic.Data.Interface;
using CargaClic.Domain.Mantenimiento;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers.Mantenimiento
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController : ControllerBase
    {
        private readonly IRepository<Cliente> _repo;

        public ClienteController(IRepository<Cliente> repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
           var usuarios = await  _repo.GetAll();
            return Ok(usuarios);
        }
    }
}