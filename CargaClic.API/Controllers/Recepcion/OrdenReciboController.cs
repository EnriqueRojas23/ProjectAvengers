using System;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Contracts.Parameters.Prerecibo;
using CargaClic.Contracts.Results.Prerecibo;
using CargaClic.Data.Interface;
using CargaClic.Domain.Prerecibo;
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

        public OrdenReciboController(IQueryHandler<ListarOrdenReciboParameter> handler,
         IRepository<OrdenRecibo> repository ,
         IRepository<OrdenReciboDetalle> repositoryDetalle) {
            _handler = handler;
            _repository = repository;
            _repositoryDetalle = repositoryDetalle;
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
      public async  Task<IActionResult> GetOrder(Guid Id)
      {
        var resp =  await  _repository.Get(x=>x.Id == Id);
        var det =  await _repositoryDetalle.GetAll(x=>x.OrdenReciboId == Id);
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


    }
}