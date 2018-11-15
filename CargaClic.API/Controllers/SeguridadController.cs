using System.Threading.Tasks;
using AutoMapper.Configuration;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Handlers.Query;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SeguridadController : ControllerBase
    {
        private readonly IQueryHandler<ListarMenusxRolParameter> _repo;
        public SeguridadController(IQueryHandler<ListarMenusxRolParameter>  repo)
        {
            _repo = repo;
        }
        [HttpGet("GetPantallasxRol/{id}")]
        public async Task<IActionResult> GetPantallasxRol(int id)
        {
            ListarMenusxRolParameter Param = new  ListarMenusxRolParameter();
            Param.idRol = id;
            var pantallas = (ListarMenusxRolResult) await _repo.Execute(Param);
            


            return Ok(pantallas.Hits);
        }
    }
}