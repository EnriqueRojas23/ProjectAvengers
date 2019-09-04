using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Data.Interface;
using CargaClic.Repository.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CargaClic.ReadRepository.Interface.Despacho;
using CargaClic.Domain.Despacho;
using CargaClic.Repository.Contracts.Inventario;
using CargaClic.API.Dtos.Despacho;
using CargaClic.Repository.Contracts.Despacho;

namespace CargaClic.API.Controllers.Despacho
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdenSalidaController : ControllerBase
    {

        private readonly IRepository<OrdenSalida> _repository;
        private readonly IRepository<OrdenSalidaDetalle> _repositoryDetalle;
        private readonly IOrdenSalidaRepository _repo_OrdenSalida;
        private readonly IDespachoReadRepository _repo_Read_Despacho;
        private readonly IMapper _mapper;

        public OrdenSalidaController(
         IRepository<OrdenSalida> repository ,
         IRepository<OrdenSalidaDetalle> repositoryDetalle,
         IOrdenSalidaRepository repo_OrdenSalida,
         IDespachoReadRepository repo_read_Despacho,
         IMapper mapper) {
            _repository = repository;
            _repositoryDetalle = repositoryDetalle;
            _repo_OrdenSalida = repo_OrdenSalida;
            _repo_Read_Despacho = repo_read_Despacho;
            _mapper = mapper;
        }
    
      [HttpDelete("DeleteOrder")]
      public async Task<IActionResult> DeleteOrder(long OrdenSalidaId)
      {
          var detalles = await _repositoryDetalle.GetAll(x=>x.OrdenSalidaId == OrdenSalidaId);
          if(detalles.Count() != 0 )
             throw new ArgumentException("err020"); 


          var ordenrecibo = await _repository.Get(x=>x.Id == OrdenSalidaId);
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

      [HttpGet("GetAllOrderDetail")]
      public async Task<IActionResult> GetOrderDetail(long Id)
      { 
          var resp  =  await _repo_Read_Despacho.GetAllOrdenSalidaDetalle(Id);
          return Ok (resp);
      }

      [HttpGet("GetAllOrder")]
      public async Task<IActionResult> GetAllOrder(int PropietarioId, int EstadoId, int DaysAgo)
      { 
          var resp  = await _repo_Read_Despacho.GetAllOrdenSalida( PropietarioId,  EstadoId,  DaysAgo);
          return Ok (resp);
      }
      [HttpGet("GetAllOrderPendiente")]
      public async Task<IActionResult> GetAllOrderPendiente(int PropietarioId, int EstadoId, int DaysAgo)
      { 
          var resp  = await _repo_Read_Despacho.GetAllOrdenSalidaPendiente( PropietarioId,  EstadoId,  DaysAgo);
          return Ok (resp);
      }
      [HttpGet("GetAllCargas")]
      public async Task<IActionResult> GetAllCargas(int PropietarioId, int EstadoId)
      { 
          var resp  = await _repo_Read_Despacho.GetAllCargas( PropietarioId,  EstadoId);
          return Ok (resp);
      }
      [HttpGet("GetOrder")]
      public async  Task<IActionResult> GetOrder(long OrdenSalidaId)
      { 
          var resp  = await _repo_Read_Despacho.GetOrdenSalida(OrdenSalidaId);
          return Ok (resp);
      }
      [HttpGet("GetAllWork")]
      public async  Task<IActionResult> GetAllWork(int PropietarioId, int EstadoId)
      { 
          var resp  = await _repo_Read_Despacho.ListarTrabajo(PropietarioId,EstadoId );
          return Ok (resp);
      }
     [HttpGet("GetAllWorkDetail")]
      public async  Task<IActionResult> GetAllWorkDetail(long WrkId)
      { 
          var resp  = await _repo_Read_Despacho.ListarTrabajoDetalle(WrkId);
          return Ok (resp);
      }
      [HttpGet("GetAllPendienteCarga")]
      public async  Task<IActionResult> GetAllPendienteCarga()
      { 
          var resp  = await _repo_Read_Despacho.ListarPendienteCarga();
          return Ok (resp);
      }

      [HttpGet("ListarPickingPendiente")]
      public async  Task<IActionResult> ListarPickingPendiente()
      { 
          var resp  = await _repo_Read_Despacho.ListarPickingPendiente();
          return Ok (resp);
      }

      [HttpGet("ListarPickingPendienteDetalle")]
      public async  Task<IActionResult> ListarPickingPendienteDetalle(long ShipmentId)
      { 
          var resp  = await _repo_Read_Despacho.ListarPickingPendienteDetalle(ShipmentId);
          return Ok (resp);
      }


   
     
     

#region _Registros

      [HttpPost("assignmentOfDoor")]
      public async Task<IActionResult> assignmentOfDoor(AsignarPuertaSalida asignarPuertaSalida)
      {
        var result = await _repo_OrdenSalida.assignmentOfDoor(asignarPuertaSalida);
        return Ok(result);
      }
      [HttpPost("MovimientoSalida")]
      public async Task<IActionResult> MovimientoSalida(InventarioForStorage inventarioForStorage)
      {
        var result = await _repo_OrdenSalida.MovimientoSalida(inventarioForStorage);
        return Ok(result);
      }

      [HttpPost("assignmentOfUser")]
      public async Task<IActionResult> assignmentOfUser(AsignarUsuarioSalida asignarPuertaSalida)
      {
        var result = await _repo_OrdenSalida.assignmentOfUser(asignarPuertaSalida);
        return Ok(result);
      }

      [HttpPost("RegisterOrdenSalida")]
      public async Task<IActionResult> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister)
      {
            var createdUser = await _repo_OrdenSalida.RegisterOrdenSalida(ordenSalidaForRegister);
            return Ok(createdUser);
      }
      [HttpPost("RegisterSalidaShipment")]
      public async Task<IActionResult> RegisterSalidaShipment(CargaForRegister ordenSalidaForRegister)
      {
            var createdUser = await _repo_OrdenSalida.RegisterSalida(ordenSalidaForRegister);
            return Ok(createdUser);
      }
      
      [HttpPost("register_detail")]
      public async Task<IActionResult> Register_Detail(OrdenSalidaDetalleForRegister ordenReciboDetalleForRegisterDto)
      {
            var resp = await _repo_OrdenSalida.RegisterOrdenSalidaDetalle(ordenReciboDetalleForRegisterDto);
            return Ok(resp);
      }
      [HttpPost("PlanificarPicking")]
      public async Task<IActionResult> PlanificarPicking(PickingPlan model)
      {
            var resp = await _repo_OrdenSalida.PlanificarPicking(model);
            return Ok(resp);
      }
      [HttpPost("RegisterCarga")]
      public async Task<IActionResult> RegisterCarga(CargaForRegister model)
      {
            var resp = await _repo_OrdenSalida.RegisterCarga(model);
            return Ok(resp);
      }
    [HttpPost("MatchTransporteCarga")]
    public async Task<IActionResult> MatchTransporteOrdenIngreso(MatchCargaEquipoTransporte matchTransporteCarga)
    {
        var createdEquipoTransporte = await _repo_OrdenSalida.matchTransporteCarga(matchTransporteCarga.CargasId,matchTransporteCarga.EquipoTransporteId);
        return Ok(createdEquipoTransporte);
    }
#endregion


    }
}