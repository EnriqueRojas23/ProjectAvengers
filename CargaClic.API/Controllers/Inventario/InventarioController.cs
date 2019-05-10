using System;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Dtos.Matenimiento;
using CargaClic.Contracts.Parameters.Inventario;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Inventario;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Contracts.Results.Prerecibo;
using CargaClic.Data.Interface;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Repository.Contracts.Inventario;
using CargaClic.Repository.Interface;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers.Mantenimiento
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class InventarioController : ControllerBase
    {
        private readonly IInventarioRepository _repoInventario;
        private readonly IMapper _mapper;
        private readonly IRepository<InventarioGeneral> _repo;
        private readonly IQueryHandler<ListarInventarioParameter> _handler;

        public InventarioController(IInventarioRepository repoInventario
        ,IMapper mapper 
        ,IRepository<InventarioGeneral> repo
        ,IQueryHandler<ListarInventarioParameter> handler )
        {
            _repoInventario = repoInventario;
            _mapper = mapper;
            _repo = repo;
            _handler = handler;
        }
        [HttpPost("register_inventario")]
        public async Task<IActionResult> RegisterInventario(InventarioForRegister inventarioGeneral)
        {
            //InventarioForRegister inventarioGeneral
            var createdInventario = await _repoInventario.RegistrarInventario(inventarioGeneral);
            return Ok(createdInventario);
        }
        [HttpPost("asignar_ubicacion")]
        public async Task<IActionResult> AsignarUbicacion(InventarioForAssingment inventarioGeneral)
        {
           var createdInventario = await _repoInventario.AssignarUbicacion(inventarioGeneral);
            return Ok(createdInventario);
        }
        [HttpPost("terminar_acomodo")]
        public async Task<IActionResult> terminar_acomodo(InventarioForFinishRecive inventarioForFinish)
        {
            var createdInventario = await _repoInventario.FinalizarRecibo(inventarioForFinish);
            return Ok();
        }
         [HttpPost("almacenamiento")]
        public async Task<IActionResult> almacenamiento(InventarioForStorage inventarioForFinish)
        {
            var createdInventario = await _repoInventario.Almacenamiento(inventarioForFinish);
            return Ok();
        }
        [HttpGet("GetAll")]
        public IActionResult GetAll(Guid? Id)
        {
            var param = new ListarInventarioParameter {
              Id   = Id
            };
            
            var resp = (ListarInventarioResult)_handler.Execute(param);
            return Ok(resp.Hits);
        }
        [HttpGet("Get")]
        public async Task<IActionResult> Get(long Id)
        {
            var result = await _repo.Get(x=>x.Id == Id);
            return Ok(result);
        }
    }
}