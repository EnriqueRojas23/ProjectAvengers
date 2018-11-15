using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Data;
using CargaClic.API.Dtos;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Domain.Seguridad;
using CargaClic.Handlers;
using CargaClic.Handlers.Query;
using CargaClic.Handlers.Seguridad;
using Common.QueryHandlers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace CargaClic.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _repo;
        private readonly IMapper _mapper;
        private readonly IQueryHandler<ListarUsuariosParameters> _user;

        public UsersController(IRepository<User> repo
        , IMapper mapper
        , IQueryHandler<ListarUsuariosParameters> user)
        {
            _user = user;
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet]
        public IActionResult GetUsers(int IdUser)
        {
            ListarUsuariosParameters Param = new ListarUsuariosParameters();
            Param.Id = IdUser;
            var users = _user.Execute(Param);
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.Get(x => x.Id == id);

            // _repo.Add(user);
            // await _repo.SaveAll();

            //var user = await _repo.GetUser(id);
            var userToResult = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToResult);
        }










    }
}