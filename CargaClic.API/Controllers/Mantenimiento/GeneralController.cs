using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Dtos.Matenimiento;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Contracts.Results.Prerecibo;
using CargaClic.Data.Interface;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Repository.Interface;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CargaClic.ReadRepository;

namespace CargaClic.API.Controllers.Mantenimiento
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GeneralController : ControllerBase
    {
        private readonly IRepository<Estado> _repo;
        private readonly IInventarioRepository _repoInventario;
        private readonly IRepository<Vehiculo> _repoVehiculo;
        private readonly IRepository<Chofer> _repoChofer;
        private readonly IRepository<Area> _repoArea;
        private readonly IRepository<Ubicacion> _repoUbicacion;
        private readonly IRepository<Proveedor> _repoProveedor;
        private readonly IRepository<ValorTabla> _repoValorTabla;
        private readonly IQueryHandler<ListarPlacasParameter> _handlerVehiculo;
        private readonly IQueryHandler<ListarProveedorParameter> _handlerProveedor;
        private readonly IQueryHandler<ObtenerEquipoTransporteParameter> _handlerEqTransporte;
        private readonly IQueryHandler<ListarUbicacionesParameter> _handlerUbicaciones;
        
        private readonly IMapper _mapper;

        public GeneralController(IRepository<Estado> repo
        ,IInventarioRepository repoInventario
        ,IRepository<Vehiculo> repoVehiculo
        ,IRepository<Chofer> repoChofer
        ,IRepository<Area> repoArea
        ,IRepository<Proveedor> repoProveedor
        ,IRepository<ValorTabla> repoValorTabla
        ,IQueryHandler<ListarPlacasParameter> handlerVehiculo
        ,IQueryHandler<ListarProveedorParameter> handlerProveedor
        ,IQueryHandler<ObtenerEquipoTransporteParameter> handlerEqTransporte
        ,IQueryHandler<ListarUbicacionesParameter> handlerUbicaciones
        
        ,IMapper mapper
        )
        {
            _repo = repo;
            _repoInventario = repoInventario;
            _repoVehiculo = repoVehiculo;
            _repoChofer = repoChofer;
            _repoArea = repoArea;
            _repoProveedor = repoProveedor;
            _repoValorTabla = repoValorTabla;
            _handlerVehiculo = handlerVehiculo;
            _handlerProveedor = handlerProveedor;
            _handlerEqTransporte = handlerEqTransporte;
            _handlerUbicaciones = handlerUbicaciones;
            
            _mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAll(int TablaId)
        {
           var result = await _repo.GetAll(x=>x.TablaId == TablaId);
           
           return Ok(result);
        }
        [HttpGet("GetAllValorTabla")]
        public async Task<IActionResult> GetAllValorTabla(int TablaId)
        {
           var result = await _repoValorTabla.GetAll(x=>x.TablaId == TablaId);
           
           return Ok(result);
        }

#region _repoVehiculo

        [HttpGet("GetVehiculos")]
        public IActionResult GetVehiculos(string placa)
        {
            if(placa=="undefined") placa = null;
            var param = new ListarPlacasParameter
            {
                Criterio = placa 
            };
            var result = (ListarPlacasResult)  _handlerVehiculo.Execute(param);
            //var result = await _repoVehiculo.GetAll(x=>x.Placa.Contains(placa));
            return Ok(result.Hits);
        }
        [HttpPost("RegisterVehiculo")]
        public async Task<IActionResult> RegisterVehiculo(VehiculoForRegisterDto vehiculo)
        {
            var param = _mapper.Map<VehiculoForRegisterDto, Vehiculo>(vehiculo);
            var createdVehiculo = await _repoVehiculo.AddAsync(param);
            return Ok(createdVehiculo);
        }

#endregion


#region _repoProveedor

        [HttpGet("GetProveedor")]
        public IActionResult GetProveedor(string criterio)
        {
         //   var result = await _repoProveedor.Get(x=>x.RazonSocial.Contains(razonsocial));
            var param = new ListarProveedorParameter
            {
                Criterio = criterio 
            };
            var result = (ListarProveedorResult)  _handlerProveedor.Execute(param);
            return Ok(result.Hits);
        }

        [HttpPost("RegisterProveedor")]
        public async Task<IActionResult> RegisterProveedor(ProveedorForRegisterDto proveedor)
        {
             var param = _mapper.Map<ProveedorForRegisterDto, Proveedor>(proveedor);
            var createdProveedor = await _repoProveedor.AddAsync(param);
            return Ok(createdProveedor);
        }

#endregion

#region _repoChofer

        [HttpGet("GetChofer")]
        public async Task<IActionResult> GetChofer(string criterio)
        {
            var result = await _repoChofer.GetAll(x=>x.Dni.Contains(criterio)
            || x.NombreCompleto.Contains(criterio) );
            return Ok(result);
        }
        [HttpPost("RegisterChofer")]
        public async Task<IActionResult> RegisterChofer(Chofer chofer)
        {
            var createdChofer = await _repoChofer.AddAsync(chofer);
            return Ok(createdChofer);
        }

#endregion          
#region _repoUbicion/Area
        [HttpGet("GetAreas")]
        public async Task<IActionResult> GetAreas()
        {
            var result = await _repoArea.GetAll();
            return Ok(result);
        }
   
        [HttpGet("GetUbicaciones")]
        public IActionResult GetUbicaciones(int AlmacenId, int AreaId)
        {
            var param = new ListarUbicacionesParameter 
            {
                AlmacenId = AlmacenId,
                AreaId = AreaId
            };

            
            var result = (ListarUbicacionesResult) _handlerUbicaciones.Execute(param);
            return Ok(result.Hits);
        }
 
        
#endregion


    }
}