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
using CargaClic.Repository;
using CargaClic.ReadRepository.Interface.Despacho;
using CargaClic.Domain.Despacho;

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
     
     

#region _Registros

      [HttpPost("RegisterOrdenSalida")]
      public async Task<IActionResult> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister)
      {
            var createdUser = await _repo_OrdenSalida.RegisterOrdenSalida(ordenSalidaForRegister);
            return Ok(createdUser);
      }
      [HttpPost("register_detail")]
      public async Task<IActionResult> Register_Detail(OrdenSalidaDetalleForRegister ordenReciboDetalleForRegisterDto)
      {
            var resp = await _repo_OrdenSalida.RegisterOrdenSalidaDetalle(ordenReciboDetalleForRegisterDto);
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
        var createdEquipoTransporte = await _repo_OrdenSalida.matchTransporteCarga(matchTransporteCarga.CargaId,matchTransporteCarga.EquipoTransporteId);
        return Ok(createdEquipoTransporte);
    }
#endregion


    }
}