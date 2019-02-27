using System.Threading.Tasks;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Data.Interface;
using CargaClic.Domain.Mantenimiento;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers.Mantenimiento
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductoController : ControllerBase
    {
        private readonly IQueryHandler<ListarProductosParameter> _handler;

        public ProductoController(IQueryHandler<ListarProductosParameter> handler)
        {
            
            _handler = handler;
        }

        [HttpGet]
        public IActionResult GetAll(string criterio, int ClienteId)
        {
            var param = new ListarProductosParameter 
            {
                Criterio = criterio,
                ClienteId = ClienteId
            };
           var result = (ListarProductosResult) _handler.Execute(param);
           return Ok(result.Hits);
        }
    }
}