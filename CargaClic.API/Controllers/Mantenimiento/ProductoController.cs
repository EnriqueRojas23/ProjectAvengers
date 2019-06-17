using System;
using System.Threading.Tasks;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Data.Interface;
using CargaClic.Domain.Mantenimiento;
using CargaClic.ReadRepository.Interface.Mantenimiento;
using CargaClic.Repository.Contracts.Mantenimiento;
using CargaClic.Repository.Interface.Mantenimiento;
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
        private readonly IRepository<Huella> _repositoryHuella;
        private readonly IMantenimientoRepository _repoMantenimiento;
        private readonly IProductoRepository _repoProducto;
        

        public ProductoController(IQueryHandler<ListarProductosParameter> handler,
        IMantenimientoRepository repoMantenimiento,
        IProductoRepository repoProducto,
        IRepository<Huella> repositoryHuella)
        {
            
            _handler = handler;
            _repositoryHuella = repositoryHuella;
            _repoMantenimiento = repoMantenimiento;
            _repoProducto = repoProducto;
        }
        [HttpGet("Get")]
        public async Task<IActionResult> Get(Guid ProductId)
        {
           var result = await _repoMantenimiento.GetProducto(ProductId);
           return Ok(result);
        }
        [HttpGet]
        public IActionResult GetAll(string criterio, int ClienteId)
        {
            if(criterio == "undefined")
            criterio = null;
            var param = new ListarProductosParameter 
            {
                Criterio = criterio,
                ClienteId = ClienteId
            };
           var result = (ListarProductosResult) _handler.Execute(param);
           return Ok(result.Hits);
        }
        [HttpGet("GetHuellas")]
        public async Task<IActionResult> GetHuellas(Guid ProductoId)
        {
           var huellas   = await _repoMantenimiento.GetAllHuella(ProductoId);
           //var huellas = await _repositoryHuella.GetAll(x=>x.ProductoId == ProductoId);
           return Ok(huellas);
        }
        
        [HttpGet("GetHuella")]
        public async Task<IActionResult> GetHuella(int HuellaId)
        {
           var huellas   = await _repoMantenimiento.GetHuella(HuellaId);
           return Ok(huellas);
        }

        [HttpGet("GetHuellasDetalle")]
        public async Task<IActionResult> GetHuellasDetalle(int HuellaId)
        {
            var result = await _repoMantenimiento.GetAllHuelladetalle(HuellaId) ;
            return Ok(result);
        }
        [HttpPost("ProductRegister")]
        public async Task<IActionResult> ProductRegister(ProductoForRegister productoForRegister)
        {
            var result = await _repoProducto.ProductRegister(productoForRegister) ;
            return Ok(result);
        }
        [HttpPost("HuellaDetalleRegister")]
        public async Task<IActionResult> HuellaDetalleRegister(HuellaDetalleForRegister huellaDetalleForRegister)
        {
            var result = await _repoProducto.HuellaDetalleRegister(huellaDetalleForRegister) ;
            return Ok(result);
        }
        [HttpPost("HuellaRegister")]
        public async Task<IActionResult> HuellaRegister(HuellaForRegister huellaForRegister)
        {
            var result = await _repoProducto.HuellaRegister(huellaForRegister) ;
            return Ok(result);
        }
        [HttpDelete("HuellaDetalleDelete")]
        public IActionResult HuellaDetalleDelete(int id)
        {
            var result =  _repoProducto.HuellaDetalleDelete(id) ;
            return Ok(result);
        }
    }
}