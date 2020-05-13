using System;
using System.Collections.Generic;
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
using CargaClic.ReadRepository.Contracts.Inventario.Parameters;
using CargaClic.ReadRepository.Interface.Inventario;
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
        private readonly IInventarioReadRepository _repoReadInventario;
        private readonly IQueryHandler<ListarInventarioParameter> _handler;

        public InventarioController(IInventarioRepository repoInventario
        ,IMapper mapper 
        ,IRepository<InventarioGeneral> repo
        ,IInventarioReadRepository repoReadInventario
        ,IQueryHandler<ListarInventarioParameter> handler )
        {
            _repoInventario = repoInventario;
            _mapper = mapper;
            _repo = repo;
            _repoReadInventario = repoReadInventario;
            _handler = handler;
        }
        [HttpPost("register_inventario")]
        public async Task<IActionResult> RegisterInventario(InventarioForRegister inventarioGeneral)
        {
            //InventarioForRegister inventarioGeneral
            var createdInventario = await _repoInventario.RegistrarInventario(inventarioGeneral);
            return Ok(createdInventario);
        }
        [HttpPost("registrar_ajuste")]
        public async Task<IActionResult> RegisterAjuste(AjusteForRegister ajusteForRegister)
        {
            //InventarioForRegister inventarioGeneral
            var createdInventario = await _repoInventario.RegistrarAjuste(ajusteForRegister);
            return Ok(createdInventario);
        }
        [HttpPost("asignar_ubicacion")]
        public async Task<IActionResult> AsignarUbicacion(IEnumerable<InventarioForAssingment> inventarioGeneral)
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
        [HttpPost("merge_ajuste")]
        public async Task<IActionResult> merge_ajuste(MergeInventarioRegister mergeInventarioRegister)
        {
            var createdInventario = await _repoInventario.MergeInventario(mergeInventarioRegister);
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
        
        [HttpGet("GetPallet")]
        public async Task<IActionResult> GetPallet(Guid OrdenReciboId)
        {
            var result = await _repoReadInventario.GetPallet(OrdenReciboId);
            return Ok(result);
        }

        [HttpGet("GetGraficoStock")]
        public async Task<IActionResult> GetPalGetGraficoStocklet(int PropietarioId, int AlmacenId)
        {
            var result = await _repoReadInventario.GetGraficosStock(PropietarioId, AlmacenId);
            return Ok(result);
        }
        [HttpGet("GetGraficoRecepcion")]
        public async Task<IActionResult> GetGraficosRecepcion(int PropietarioId, int AlmacenId)
        {
            var result = await _repoReadInventario.GetGraficosRecepcion(PropietarioId, AlmacenId);
            return Ok(result);
        }
        [HttpGet("GetAllInvetarioAjuste")]
        public async Task<IActionResult> GetAllInvetarioAjuste(Guid ProductoId , 
         int ClienteId, string FechaInicio, int EstadoId)
        {
            
            var param = new GetAllInventarioParameters {
                ClientId = ClienteId,
                ProductoId = ProductoId,
                EstadoId = EstadoId
            };
            
            var resp = await  _repoReadInventario.GetAllInventario(param);
            return Ok(resp);
        }
        [HttpGet("GetAllInvetarioAjusteDetalle")]
        public async Task<IActionResult> GetAllInvetarioAjusteDetalle(long Id)
        {
            var resp = await  _repoReadInventario.GetAllInventarioDetalle(Id);
            return Ok(resp);
        }

        [HttpPost("actualizar_inventario")]
        public async Task<IActionResult> ActualizarInventario(InventarioForEdit inventarioGeneral)
        {
            var editedInventario = await _repoInventario.ActualizarInventario(inventarioGeneral);
            return Ok(editedInventario);
        }
    }
}