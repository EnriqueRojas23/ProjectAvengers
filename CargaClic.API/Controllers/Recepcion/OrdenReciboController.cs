using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Dtos;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Common;
using CargaClic.Contracts.Parameters.Mantenimiento;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Mantenimiento;
using CargaClic.Contracts.Results.Prerecibo;
using CargaClic.Data.Interface;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Interface;
using Common.QueryHandlers;
using System.Web.Http;  
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
        private readonly IQueryHandler<ObtenerOrdenReciboParameter> _handlerCab;
        private readonly IQueryHandler<ObtenerOrdenReciboDetalleParameter> _handlerDetalle;
        private readonly IQueryHandler<ObtenerEquipoTransporteParameter> _handlerEqTransporte;
        private readonly IQueryHandler<ListarEquipoTransporteParameter> _handlerListarEqTransporte;
        private readonly IOrdenReciboRepository _repoOrdenRecibo;
        private readonly IRepository<Vehiculo> _repoVehiculo;
        private readonly IRepository<Chofer> _repoChofer;
        private readonly IRepository<Proveedor> _repoProveedor;
        private readonly IQueryHandler<ListarOrdenReciboByEquipoTransporteParameter> _handlerByEquipoTransporte;
        private readonly IMapper _mapper;

        public OrdenReciboController(IQueryHandler<ListarOrdenReciboParameter> handler,
         IRepository<OrdenRecibo> repository ,
         IRepository<OrdenReciboDetalle> repositoryDetalle,
         IQueryHandler<ObtenerOrdenReciboParameter> handlerCab,
         IQueryHandler<ObtenerOrdenReciboDetalleParameter> handlerDetalle,
         IQueryHandler<ObtenerEquipoTransporteParameter> handlerEqTransporte,
         IQueryHandler<ListarEquipoTransporteParameter> handlerListarEqTransporte,
         IOrdenReciboRepository repoOrdenRecibo,
         IRepository<Vehiculo> repoVehiculo,
         IRepository<Chofer> repoChofer,
         IRepository<Proveedor> repoProveedor,
         IQueryHandler<ListarOrdenReciboByEquipoTransporteParameter> handlerByEquipoTransporte,
         
         IMapper mapper) {
            _handler = handler;
            _repository = repository;
            _repositoryDetalle = repositoryDetalle;
            _handlerCab = handlerCab;
            _handlerDetalle = handlerDetalle;
            _handlerEqTransporte = handlerEqTransporte;
            _handlerListarEqTransporte = handlerListarEqTransporte;
            _repoOrdenRecibo = repoOrdenRecibo;
            _repoVehiculo = repoVehiculo;
            _repoChofer = repoChofer;
            _repoProveedor = repoProveedor;
            _handlerByEquipoTransporte = handlerByEquipoTransporte;
            _mapper = mapper;
        }
       //////////////////// Obtener Listado de ordenes /////
      [HttpGet]
      public IActionResult GetOrders(int? PropietarioId, int? EstadoId , int? DaysAgo , string fec_ini , string fec_fin , int? AlmacenId)
      {
          var param = new ListarOrdenReciboParameter
          {   
              PropietarioId = PropietarioId,
              EstadoId = EstadoId,
              DaysAgo = DaysAgo,
              fec_fin = fec_fin,
              fec_ini = fec_ini,
              AlmacenId = AlmacenId
          };
          var resp = (ListarOrdenReciboResult)  _handler.Execute(param);
          return Ok(resp.Hits);
      }
      [HttpDelete("DeleteOrder")]
      public async Task<IActionResult> DeleteOrder(Guid OrdenReciboId)
      {
          var detalles = await _repositoryDetalle.GetAll(x=>x.OrdenReciboId == OrdenReciboId);
          if(detalles.Count() != 0 )
             throw new ArgumentException("err020"); 


          var ordenrecibo = await _repository.Get(x=>x.Id == OrdenReciboId);
          _repository.Delete(ordenrecibo);
          
          
          return Ok(ordenrecibo);
      }
      [HttpDelete("DeleteOrderDetail")]
      public async Task<IActionResult> DeleteOrderDetail(long id)
      {
          var detalle = await _repositoryDetalle.Get(x=>x.Id == id);
          _repositoryDetalle.Delete(detalle);
          return Ok(detalle);
      }
       //////////////////// Obtener Listado de ordenes por EquipoTransporte /////
      [HttpGet("GetOrderbyEquipoTransporte")]
      public IActionResult GetOrderbyEquipoTransporte(long EquipoTransporteId)
      {
          var param = new ListarOrdenReciboByEquipoTransporteParameter
          {   
               EquipoTransporteId  = EquipoTransporteId,
              
          };
          var resp = (ListarOrdenReciboByEquipoTransporteResult)  _handlerByEquipoTransporte.Execute(param);
          return Ok(resp.Hits);
      }
      ///////////////////// Obtener Detalle ///////
      [HttpGet("GetOrderDetail")]
      public IActionResult GetOrderDetail(long Id)
      { 
        var param = new ObtenerOrdenReciboDetalleParameter {
          Id = Id  
        };
        
        var resp = (ObtenerOrdenReciboDetalleResult)_handlerDetalle.Execute(param);
        return Ok(resp);
      }

      ///////////////// Obtener Orden (incluye detalles) /////////
      [HttpGet("GetOrder")]
      public IActionResult GetOrder(Guid Id)
      {
        var param = new ObtenerOrdenReciboParameter {
          Id = Id  
        };
        // var resp =  await  _repository.Get(x=>x.Id == Id);
        // var det =  await _repositoryDetalle.GetAll(x=>x.OrdenReciboId == Id);
        var resp = (ObtenerOrdenReciboResult)_handlerCab.Execute(param);
        return Ok(resp);
      }




#region _Registros

      [HttpPost("register")]
      public async Task<IActionResult> Register(OrdenReciboForRegisterDto ordenReciboForRegisterDto)
      {
              var NumOrden =  await   _repository.GetMaxNumOrdenRecibo();

            var param = new OrdenRecibo {
                Id =  Guid.NewGuid(),
                NumOrden = (Convert.ToInt64(NumOrden.NumOrden) + 1).ToString().PadLeft(7,'0'),
                PropietarioId = ordenReciboForRegisterDto.PropietarioId,
                Propietario = ordenReciboForRegisterDto.Propietario,
                AlmacenId = ordenReciboForRegisterDto.AlmacenId,
                GuiaRemision = ordenReciboForRegisterDto.GuiaRemision,
                FechaEsperada  = Convert.ToDateTime(ordenReciboForRegisterDto.FechaEsperada),
                FechaRegistro = DateTime.Now,
                HoraEsperada = ordenReciboForRegisterDto.HoraEsperada,
                EstadoId = (Int16) Constantes.EstadoOrdenIngreso.Planeado,
                UsuarioRegistro = 1,//ordenReciboForRegisterDto.UsuarioRegistro,
                Activo = true
                
            };
            var createdUser = await _repository.AddAsync(param);
            return Ok(createdUser);
      }
      [HttpPost("update")]
      public async Task<IActionResult> Update(OrdenReciboForRegisterDto ordenReciboForRegisterDto)
      {
            var orden = await _repository.Get(x=>x.Id == ordenReciboForRegisterDto.Id);

            orden.PropietarioId = ordenReciboForRegisterDto.PropietarioId;
            orden.Propietario = ordenReciboForRegisterDto.Propietario;
            orden.GuiaRemision = ordenReciboForRegisterDto.GuiaRemision;
            orden.FechaEsperada  = Convert.ToDateTime(ordenReciboForRegisterDto.FechaEsperada);
            orden.HoraEsperada = ordenReciboForRegisterDto.HoraEsperada;
             orden.AlmacenId = ordenReciboForRegisterDto.AlmacenId;

            var createdUser = await _repository.SaveAll();
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
                Cantidad = ordenReciboDetalleForRegisterDto.cantidad,
                Completo = false
            };
            var resp = await _repositoryDetalle.AddAsync(param);
            return Ok(resp);
      }
      [HttpPost("identify_detail")]
      public async Task<IActionResult> Identify_detail(OrdenReciboDetalleForIdentifyDto ordenReciboDetalleForIdentifyDto)
      {
                var id = await _repoOrdenRecibo.identifyDetail(ordenReciboDetalleForIdentifyDto);
                return Ok(id);
     
      }
      [HttpPost("identify_detail_mix")]
      public async Task<IActionResult> Identify_detail_mix(IEnumerable<OrdenReciboDetalleForIdentifyDto> ordenReciboDetalleForIdentifyDto)
      {
                var id = await _repoOrdenRecibo.identifyDetailMix(ordenReciboDetalleForIdentifyDto);
                return Ok(id);
     
      }
      [HttpPost("close_details")]
      public async Task<IActionResult> Close_Details(Guid Id)
      {
          //Valida si todos los detalles estan cerrados  
          var detalles = await _repositoryDetalle.GetAll(x=>x.OrdenReciboId == Id);
          var pendientes =  detalles.ToList().Where(x=>x.Completo == false);
          
          if(pendientes.Count() > 0)
            throw new ArgumentException("err011");
            await _repoOrdenRecibo.closeDetails(Id);
                //var id = await _repoOrdenRecibo.identifyDetail(ordenReciboDetalleForIdentifyDto);
                return Ok(Id);
     
      }

      
#endregion
#region _repoEquipoTransporte

        [HttpGet("GetEquipoTransporte")]
        public  IActionResult GetEquipoTransporte(string placa)
        {
             var vehiculo =  _repoVehiculo.Get(x=>x.Placa == placa).Result;

             if(vehiculo == null)
                return Ok();
             

            var param = new ObtenerEquipoTransporteParameter
            {
                VehiculoId = vehiculo.Id 
            };
            var result = (ObtenerEquipoTransporteResult)   _handlerEqTransporte.Execute(param);
            return Ok(result);

        }
        [HttpGet("ListEquipoTransporte")]
        public IActionResult ListEquipoTransporte(int? PropietarioId, int EstadoId  
        , string fec_fin, string fec_ini, int? AlmacenId)
        {
            var param = new ListarEquipoTransporteParameter
            {
                EstadoId = EstadoId
                ,PropietarioId = PropietarioId
                ,fec_fin =fec_fin
                ,fec_ini = fec_ini
                ,AlmacenId = AlmacenId
            };
            var result = (ListarEquipoTransporteResult)  _handlerListarEqTransporte.Execute(param);
            return Ok(result.Hits.OrderByDescending(x=>x.EquipoTransporte));
        }

        [HttpPost("RegisterEquipoTransporte")]
        public async Task<IActionResult> RegisterEquipoTransporte(EquipoTransporteForRegisterDto equipotrans)
        {
              
              var param = new EquipoTransporte();
               
              var vehiculo = await _repoVehiculo.Get(x=>x.Placa ==  equipotrans.Placa);
              //Insertar nuevo
               if(vehiculo == null)
               {
                  vehiculo = new Vehiculo();
                  vehiculo.TipoId = equipotrans.tipoVehiculo;
                  vehiculo.MarcaId = equipotrans.marcaVehiculo;
                  vehiculo.Placa = equipotrans.Placa;
                  vehiculo = await _repoVehiculo.AddAsync(vehiculo);
               }
               
              var proveedor = await _repoProveedor.Get(x=>x.Ruc == equipotrans.Ruc);
              if(proveedor == null)
              {
                  proveedor = new Proveedor();
                  proveedor.RazonSocial = equipotrans.RazonSocial;
                  proveedor.Ruc = equipotrans.Ruc;
                  proveedor = await _repoProveedor.AddAsync(proveedor);
              }
               
              
              var chofer = await _repoChofer.Get(x=>x.Dni == equipotrans.Dni);
              if(chofer == null)
              {
                   chofer = new Chofer();
                   chofer.Brevete = equipotrans.Brevete;
                   chofer.Dni = equipotrans.Dni;
                   chofer.NombreCompleto = equipotrans.NombreCompleto;
                   chofer = await _repoChofer.AddAsync(chofer);
              }
              param.ProveedorId = proveedor.Id;
              param.VehiculoId = vehiculo.Id;
              param.ChoferId = chofer.Id;
              param.EstadoId = (int) Constantes.EstadoEquipoTransporte.EnProceso;
              param.PropietarioId = equipotrans.PropietarioId;

             var createdEquipoTransporte = await _repoOrdenRecibo.RegisterEquipoTransporte(param,equipotrans.OrdenReciboId);
             
             return Ok(createdEquipoTransporte);
        }
        [HttpPost("MatchTransporteOrdenIngreso")]
        public async Task<IActionResult> MatchTransporteOrdenIngreso(EquipoTransporteForRegisterDto equipotrans)
        {
             //var param = _mapper.Map<EquipoTransporteForRegisterDto, EquipoTransporte>(equipotrans);
              //Buscar Placa
          var createdEquipoTransporte = await _repoOrdenRecibo.matchTransporteOrdenIngreso(equipotrans);
          return Ok(createdEquipoTransporte);
        }


#endregion
#region _Ubicaciones

        [HttpPost("assignmentOfDoor")]
        public async Task<IActionResult> assignmentOfDoor(LocationsForAssignmentDto locationsForAssignmentDto)
        {
            var result = await _repoOrdenRecibo.assignmentOfDoor(locationsForAssignmentDto.EquipoTransporteId,locationsForAssignmentDto.UbicacionId);
            return Ok(result);
        }



#endregion

    }
}