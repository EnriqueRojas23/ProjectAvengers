using System.Threading.Tasks;
using AutoMapper.Configuration;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Handlers.Query;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Threading;

namespace CargaClic.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SeguridadController : ControllerBase
    {
        private readonly IQueryHandler<ListarMenusxRolParameter> _repo;
        public SeguridadController(IQueryHandler<ListarMenusxRolParameter>  repo)
        {
            _repo = repo;
        }
        // [HttpGet("GetPantallasxRol/{id}")]
        // public async Task<IActionResult> GetPantallasxRol(int id)
        // {
        //     ListarMenusxRolParameter Param = new  ListarMenusxRolParameter();
        //     Param.idRol = id;
        //     ListarMenusxRolResult pantallas = (ListarMenusxRolResult) await _repo.Execute(Param);
        //     List<ListarMenusxRolDto> final = new List<ListarMenusxRolDto>();

        //     foreach (var item in pantallas.Hits.OrderBy(x=>x.CodigoPadre))
        //     {   
        //         if(item.Nivel=="1")
        //         {
        //             item.submenu = new List<ListarMenusxRolDto>();
        //             item.submenu.AddRange(pantallas.Hits.Where(x=>x.CodigoPadre == item.Codigo && x.Nivel == "2").ToList());
        //             final.Add(item);
        //         }
                
        //     }
        //      return Ok(final);
        // }
         [HttpGet("GetPantallasxRol/{id}")]
        public  IActionResult GetPantallasxRol(int id)
        {
            ListarMenusxRolParameter Param = new  ListarMenusxRolParameter();
            Param.idRol = id;
            ListarMenusxRolResult pantallas = (ListarMenusxRolResult)  _repo.Execute(Param);
            List<ListarMenusxRolDto> final = new List<ListarMenusxRolDto>();

            foreach (var item in pantallas.Hits.OrderBy(x=>x.CodigoPadre))
            {   
                if(item.Nivel=="1")
                {
                    item.submenu = new List<ListarMenusxRolDto>();
                    item.submenu.AddRange(pantallas.Hits.Where(x=>x.CodigoPadre == item.Codigo && x.Nivel == "2").ToList());
                    final.Add(item);
                }
                
            }

             return Ok(final);
        }
    }
}