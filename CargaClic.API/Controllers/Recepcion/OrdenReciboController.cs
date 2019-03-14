using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Contracts.Results.Prerecibo;
using CargaClic.Data.Interface;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Interface;
using Common.QueryHandlers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers.Recepcion
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenReciboController : ControllerBase
    {
        private readonly IQueryHandler<ListarOrdenReciboParameter> _handler;
        private readonly IRepository<OrdenRecibo> _repository;
        private readonly IRepository<OrdenReciboDetalle> _repositoryDetalle;
        private readonly IQueryHandler<ObtenerOrdenReciboParameter> _handlerDetalle;
        private readonly IQueryHandler<ObtenerEquipoTransporteParameter> _handlerEqTransporte;
        private readonly IOrdenReciboRepository _repoOrdenRecibo;
        private readonly IRepository<Vehiculo> _repoVehiculo;
        private readonly IRepository<Chofer> _repoChofer;
        private readonly IRepository<Proveedor> _repoProveedor;
        private readonly IQueryHandler<ListarUbicacionesParameter> _handlerUbicaciones;
        private readonly IMapper _mapper;

        public OrdenReciboController(IQueryHandler<ListarOrdenReciboParameter> handler,
         IRepository<OrdenRecibo> repository ,
         IRepository<OrdenReciboDetalle> repositoryDetalle,
         IQueryHandler<ObtenerOrdenReciboParameter> handlerDetalle,
         IQueryHandler<ObtenerEquipoTransporteParameter> handlerEqTransporte,
         IOrdenReciboRepository repoOrdenRecibo,
         IRepository<Vehiculo> repoVehiculo,
         IRepository<Chofer> repoChofer,
         IRepository<Proveedor> repoProveedor,
         IQueryHandler<ListarUbicacionesParameter> handlerUbicaciones,
         IMapper mapper) {
            _handler = handler;
            _repository = repository;
            _repositoryDetalle = repositoryDetalle;
            _handlerDetalle = handlerDetalle;
            _handlerEqTransporte = handlerEqTransporte;
            _repoOrdenRecibo = repoOrdenRecibo;
            _repoVehiculo = repoVehiculo;
            _repoChofer = repoChofer;
            _repoProveedor = repoProveedor;
            _handlerUbicaciones = handlerUbicaciones;
            _mapper = mapper;
        }

     [HttpGet]
      public IActionResult GetOrders(int PropietarioId, int EstadoId , int DaysAgo)
      {
          var param = new ListarOrdenReciboParameter
          {   
              PropietarioId = PropietarioId,
              EstadoId = EstadoId,
              DaysAgo = DaysAgo
          };
          var resp = (ListarOrdenReciboResult)  _handler.Execute(param);
          return Ok(resp.Hits);
      }
      [HttpGet("GetOrder")]
      public IActionResult GetOrder(Guid Id)
      {
        var param = new ObtenerOrdenReciboParameter {
          Id = Id  
        };
        // var resp =  await  _repository.Get(x=>x.Id == Id);
        // var det =  await _repositoryDetalle.GetAll(x=>x.OrdenReciboId == Id);
        var resp = (ObtenerOrdenReciboResult)_handlerDetalle.Execute(param);
        return Ok(resp);
      }
      [HttpPost("register")]
      public async Task<IActionResult> Register(OrdenReciboForRegisterDto ordenReciboForRegisterDto)
      {
              var NumOrden =  await   _repository.GetMaxNumOrdenRecibo();

            var param = new OrdenRecibo {
                Id =  Guid.NewGuid(),
                NumOrden = (Convert.ToInt64(NumOrden.NumOrden) + 1).ToString().PadLeft(7,'0'),
                PropietarioId = ordenReciboForRegisterDto.PropietarioId,
                Propietario = ordenReciboForRegisterDto.Propietario,
                AlmacenId = 1, //ordenReciboForRegisterDto.AlmacenId,
                GuiaRemision = ordenReciboForRegisterDto.GuiaRemision,
                FechaEsperada  = Convert.ToDateTime(ordenReciboForRegisterDto.FechaEsperada),
                FechaRegistro = DateTime.Now,
                HoraEsperada = ordenReciboForRegisterDto.HoraEsperada,
                EstadoId = 1,// ordenReciboForRegisterDto.EstadoID,
                UsuarioRegistro = 1,//ordenReciboForRegisterDto.UsuarioRegistro,
                Activo = true
                
            };
            var createdUser = await _repository.AddAsync(param);
            return Ok(createdUser);
      }
      [HttpPost("register_detail")]
      public async Task<IActionResult> Register_Detail(OrdenReciboDetalleForRegisterDto ordenReciboDetalleForRegisterDto)
      {
             string linea = "";

           var detalles = await  _repositoryDetalle.GetAll(x=>x.OrdenReciboId == ordenReciboDetalleForRegisterDto.OrdenReciboId);
           if(detalles.Count() == 0)
           {
              linea = "0001";
           }
           else {
            linea = detalles.Max(x=>x.Linea).ToString();
           linea = (Convert.ToInt32(linea) + 1).ToString().PadLeft(4,'0');
           }
           

            var param = new OrdenReciboDetalle {
                OrdenReciboId = ordenReciboDetalleForRegisterDto.OrdenReciboId,
                Linea = linea,//ordenReciboDetalleForRegisterDto.Linea,
                ProductoId   = ordenReciboDetalleForRegisterDto.ProductoId,
                Lote = ordenReciboDetalleForRegisterDto.Lote,
                HuellaId = ordenReciboDetalleForRegisterDto.HuellaId,
                EstadoID = ordenReciboDetalleForRegisterDto.EstadoID,
                cantidad = ordenReciboDetalleForRegisterDto.cantidad,
            };
            var resp = await _repositoryDetalle.AddAsync(param);
            return Ok(resp);
      }
      
#region _repoEquipoTransporte

        [HttpGet("GetEquipoTransporte")]
        public IActionResult GetEquipoTransporte(int VehiculoId)
        {
            var param = new ObtenerEquipoTransporteParameter
            {
                VehiculoId = VehiculoId 
            };
            var result = (ObtenerEquipoTransporteResult)  _handlerEqTransporte.Execute(param);
            return Ok(result);
        }

        [HttpPost("RegisterEquipoTransporte")]
        public async Task<IActionResult> RegisterEquipoTransporte(
            EquipoTransporteForRegisterDto equipotrans
            )
        {
             //var param = _mapper.Map<EquipoTransporteForRegisterDto, EquipoTransporte>(equipotrans);
              //Buscar Placa
             var param = new EquipoTransporte();

              var vehiculo = await _repoVehiculo.Get(x=>x.Placa ==  equipotrans.Placa);
              if(vehiculo == null)
              return Ok("No se encontró el vehículo especificado.");

              var proveedor = await _repoProveedor.Get(x=>x.Ruc == equipotrans.Ruc);
              if(proveedor == null)
              return Ok("No se encontró la empresa de transporte especificada.");
              
              var chofer = await _repoChofer.Get(x=>x.Dni == equipotrans.Dni);
              if(chofer == null)
              return Ok("No se encontró el chofer especificado.");

              param.VehiculoId = vehiculo.Id;
              param.ChoferId = chofer.Id;
              param.ProveedorId = proveedor.Id;
              
             var createdEquipoTransporte = await _repoOrdenRecibo.RegisterEquipoTransporte(param,equipotrans.OrdenReciboId);
             return Ok(createdEquipoTransporte);
        }

#endregion
#region _Ubicaciones

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
        
        [HttpPost("assignmentOfDoor")]
        public async Task<IActionResult> assignmentOfDoor(LocationsForAssignmentDto locationsForAssignmentDto)
        {
            var result = await _repoOrdenRecibo.assignmentOfDoor(locationsForAssignmentDto.OrdenReciboId,locationsForAssignmentDto.UbicacionId);
            return Ok(result);
        }



#endregion

    }
}