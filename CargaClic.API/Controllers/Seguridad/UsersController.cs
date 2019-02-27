using System;
using System.Threading.Tasks;
using AutoMapper;
using CargaClic.API.Data;
using CargaClic.API.Dtos;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Data.Interface;
using CargaClic.Domain.Seguridad;
using CargaClic.Handlers;
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
        
        private readonly IAuthRepository _auth;
        private readonly IMapper _mapper;
        private readonly IQueryHandler<ListarUsuariosParameters> _user;

        public UsersController(IRepository<User> repo
        
        ,IAuthRepository auth
        , IMapper mapper
        , IQueryHandler<ListarUsuariosParameters> user)
        {
            _user = user;
            _mapper = mapper;
            _repo = repo;
            
            _auth = auth;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _auth.UserExists(userForRegisterDto.Username))
                return BadRequest("Username ya existe");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,
                NombreCompleto = userForRegisterDto.NombreCompleto,
                Email = userForRegisterDto.Email,
                Created = DateTime.Now,
                LastActive = DateTime.Now,
                EstadoId = 1,
                Dni = userForRegisterDto.Dni    

                
            };

            var createdUser = await _auth.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
        }
        [HttpPost("updateestado")]
        public async Task<IActionResult> UpdateEstado(UserForUpdateDto userForUpdateDto )
        {
          
            var userToUpdate = new User
            {
                Id = userForUpdateDto.Id,
                EstadoId = userForUpdateDto.EstadoId,
            };

            var createdUser = await _auth.UpdateEstadoId(userToUpdate);
            return StatusCode(200);
        }
        [HttpPost("update")]
        public async Task<IActionResult> Update(UserForUpdateDto userForRegisterDto)
        {
          
            var userToCreate = new User
            {
                Id = userForRegisterDto.Id,
                NombreCompleto = userForRegisterDto.NombreCompleto,
                Email = userForRegisterDto.Email,
                Dni = userForRegisterDto.Dni,
                EstadoId = userForRegisterDto.EstadoId
                
            };

            var createdUser = await _auth.Update(userToCreate);
            return StatusCode(201);
        }
        
        [HttpGet]
        public IActionResult GetUsers(string nombres)
        {
            ListarUsuariosParameters Param = new ListarUsuariosParameters();
            
            Param.Nombre = nombres;
            var users = (ListarUsuariosResult) _user.Execute(Param);
            return Ok(users.Hits);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repo.Get(x => x.Id == id);
            var userToResult = _mapper.Map<UserForDetailedDto>(user);
            return Ok(userToResult);
        }


    }
}