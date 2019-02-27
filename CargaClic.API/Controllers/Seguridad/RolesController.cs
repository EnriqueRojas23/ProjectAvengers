using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using AutoMapper;
using CargaClic.API.Dtos;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Data.Interface;
using CargaClic.Domain.Seguridad;
using CargaClic.Handlers.Seguridad;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace CargaClic.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RolesController : ControllerBase
    {
        private readonly IRepository<Rol> _repo;
        private readonly IQueryHandler<ListarTreeViewParameter> _handler;
        private readonly IMapper _mapper;
        private readonly IRepository<RolPagina> _repo_option;
        private readonly IRepository<Pagina> _repo_Pagina;
        private readonly IRepository<RolUser> _repo_RolUser;
        private readonly IQueryHandler<ListarRolesPorUsuarioParameter> _hanlder_RolUser;

        public RolesController(IRepository<Rol> repo,
        IRepository<RolPagina> repo_option,
        IRepository<Pagina> repo_Pagina,
        IRepository<RolUser> repo_RolUser,
        IQueryHandler<ListarRolesPorUsuarioParameter> handler_RolUser,
        IQueryHandler<ListarTreeViewParameter> handler, IMapper mapper)
        {
            _repo_option = repo_option;
            _repo_Pagina = repo_Pagina;
            _repo_RolUser = repo_RolUser;
            _hanlder_RolUser = handler_RolUser;
            _repo = repo;
            _handler = handler;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _repo.GetAll(x=>x.Activo);
            return Ok(roles);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(RolForRegisterDto rolForRegisterDto)
        {
            var rolToCreate = new Rol
            {
                Descripcion = rolForRegisterDto.Descripcion,
                Alias = rolForRegisterDto.Alias,
                Publico = rolForRegisterDto.Publico,
                Activo = rolForRegisterDto.Activo

            };
            ;
            await _repo.AddAsync(rolToCreate);
            return StatusCode(202);
        }
        [HttpGet("getallroles")]
        public  IActionResult getAllRolesForUser(int UserId)
        {
            var Param = new ListarRolesPorUsuarioParameter 
            {
               UserId  = UserId
            };
            var roles =  (ListarRolesPorUsuarioResult)  _hanlder_RolUser.Execute(Param);
            return Ok(roles.Hits);
        }



        [HttpPost("addroluser")]
        public async Task<IActionResult> AddRolUser(IEnumerable<RolUserForRegisterDto> rolUserForRegisterDto,int UserId)
        {

            #region Eliminar todo

                    if(rolUserForRegisterDto.ToList().Count == 0)
                    {
                        var todo = await _repo_RolUser.GetAll(x=>x.UserId == UserId);
                        _repo_RolUser.DeleteAll(todo);
                    }
                    else
                    {
                        var todo = await _repo_RolUser.GetAll(x=>x.UserId == rolUserForRegisterDto.ToList()[0].UserId);
                        _repo_RolUser.DeleteAll(todo);
                    }

            #endregion


            foreach (var item in rolUserForRegisterDto)
            {

               var rol = await _repo.Get(x=>x.Alias == item.Alias);
               var RolUserToCreate = new RolUser
                {
                       UserId = item.UserId,
                       RolId  = rol.Id

                };
                // var exist = await _repo_RolUser.Get(x=>x.RolId == RolUserToCreate.RolId && x.UserId == RolUserToCreate.UserId);
                // if(exist == null)
                await _repo_RolUser.AddAsync(RolUserToCreate);

            }
            return Ok(rolUserForRegisterDto);
        }


     
      
      
        [HttpGet("obtenermenu")]
        public IActionResult ObtenerMenu(int idRol)
        {
            ListarTreeViewParameter Param = new ListarTreeViewParameter
            {
                idRol = idRol
            };
            TreeviewItemResult pantallas = (TreeviewItemResult)_handler.Execute(Param);
            List<TreeviewItem> final = new List<TreeviewItem>();
            foreach (var item in pantallas.Hits)
            {

                if (item.Nivel == "1")
                {

                    item.children = new List<TreeviewItem>();
                    item.children.AddRange(pantallas.Hits.Where(x => x.CodigoPadre == item.Codigo && x.Nivel == "2").ToList());
                    final.Add(item);
                }
            }
            return Ok(final);
        }


        [HttpPost("addoption")]
        public async Task<IActionResult> AddOptions(IEnumerable<RolForAddOptionDto> rolForAddOptionDto)
        {
              var rolespagina = await _repo_option.GetAll(x=>x.IdRol== rolForAddOptionDto.ToList()[0].IdRol) ;

              _repo_option.DeleteAll(rolespagina);

              var total  = await _repo_Pagina.GetAll();

              
              foreach (var item in rolForAddOptionDto)
              {
                  var rolPaginaCreate = new RolPagina
                  {
                    IdRol = item.IdRol,
                    IdPagina = item.IdPagina,
                    permisos = item.permisos
                
                  };
                   var aux  =  total.Where(x=>x.Id == rolPaginaCreate.IdPagina).SingleOrDefault();
                   var padre = total.Where(x=>x.Codigo == aux.CodigoPadre).SingleOrDefault();

                  var exist =   await _repo_option.Get(x=>x.IdPagina == padre.Id && x.IdRol == item.IdRol );
                  if( exist == null)
                  {
                    var rolPaginaCreatePadre = new RolPagina
                    {
        
                        IdRol = item.IdRol,
                        IdPagina = padre.Id,
                        permisos = "AME"
                    
                    };
                    await _repo_option.AddAsync(rolPaginaCreatePadre);
                  }

                   await _repo_option.AddAsync(rolPaginaCreate);
              }

             
          
            return Ok();
        }



    }
}