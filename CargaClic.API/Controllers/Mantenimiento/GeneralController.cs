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
    public class GeneralController : ControllerBase
    {
        private readonly IRepository<Estado> _repo;
        public GeneralController(IRepository<Estado> repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(int TablaId)
        {
           var result = await _repo.GetAll(x=>x.TablaId == TablaId);
           
           return Ok(result);
        }
    }
}