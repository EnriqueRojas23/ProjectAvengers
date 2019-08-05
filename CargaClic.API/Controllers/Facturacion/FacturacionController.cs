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
using CargaClic.ReadRepository.Interface.Facturacion;
using CargaClic.Domain.Facturacion;

namespace CargaClic.API.Controllers.Facturacion
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class FacturacionController : ControllerBase
    {

        private readonly IRepository<OrdenSalida> _repository;
        private readonly IRepository<OrdenSalidaDetalle> _repositoryDetalle;
        private readonly IRepository<Documento> _repository_Documento;
        private readonly IFacturacionReadRepository _repo_Read_Facturacion;
        private readonly IFacturacionRepository _repo_Facturacion;
        private readonly IMapper _mapper;

        public FacturacionController(
         IFacturacionReadRepository repo_read_Facturacion,
         IFacturacionRepository repo_Facturacion,
         IRepository<Documento> repo_Documento,
         IMapper mapper) {
            _repo_Read_Facturacion = repo_read_Facturacion;
            _repo_Facturacion = repo_Facturacion;
            _repository_Documento = repo_Documento;
            _mapper = mapper;
        }
        [HttpGet("GetPendientesLiquidacion")]
        public async Task<IActionResult> GetPendientesLiquidacion(int Id)
        { 
            var resp  =  await _repo_Read_Facturacion.GetPendientesLiquidacion(Id);
            return Ok (resp);
        }
        
        [HttpGet("GetPreLiquidaciones")]
        public async Task<IActionResult> GetPreLiquidaciones(int Id)
        { 
            var resp  =  await _repo_Read_Facturacion.GetPreLiquidaciones(Id);
            return Ok (resp);
        }
         [HttpGet("GetPreLiquidacion")]
        public async Task<IActionResult> GetPreLiquidacion(int Id)
        { 
            var resp  =  await _repo_Read_Facturacion.GetPreLiquidacion(Id);
            return Ok (resp);
        }
        [HttpPost("GenerarPreliquidacion")]
        public async  Task<IActionResult> GenerarPreliquidacion(PreliquidacionForRegister Id)
        { 
            var resp  = await _repo_Facturacion.GenerarPreliquidacion(Id);
            return Ok (resp);
        }   

        [HttpPost("GenerarComprobante")]
        public async  Task<IActionResult> GenerarComprobante(ComprobanteForRegister Id)
        { 
            var resp  = await _repo_Facturacion.GenerarComprobante(Id);
            return Ok (resp);
        }

        [HttpGet("GetAllSeries")]
        public async  Task<IActionResult> GetAllSeries()
        { 
            var resp  = await _repository_Documento.GetAll();
            return Ok (resp);
        }
    }
}