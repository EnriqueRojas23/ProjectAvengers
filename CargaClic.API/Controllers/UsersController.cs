using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Data;
using CargaClic.API.Dtos;
using CargaClic.Data.Seguridad;
using CargaClic.Handlers;
using CargaClic.Handlers.Seguridad;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CargaClic.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _repo;
        private readonly IMapper _mapper;
        public UsersController(IRepository<User> repo, IMapper mapper)
        {
            _mapper = mapper; 
            _repo = repo;
        }
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repo.GetAll();
            return Ok(users);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
           // var user = await _repo.Get(x=>x.Id == id);
            var user = await _repo.GetUser(id);
            var userToResult  =  _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToResult);
        }
       









    }
}