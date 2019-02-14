using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CargaClic.API.Data;
using CargaClic.API.Dtos;
using CargaClic.Data;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using CargaClic.Data.Domain.Seguridad;
using CargaClic.Handlers;
using CargaClic.Handlers.Seguridad;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Common.QueryHandlers;
using System.Linq;

namespace CargaClic.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IQueryHandler<ListarMenusxRolParameter> _repo_Menu;

        public AuthController(IAuthRepository repo, IConfiguration config,IQueryHandler<ListarMenusxRolParameter>  repo_menu)
        {
            _config = config;
            _repo_Menu = repo_menu;
            _repo = repo;
        }
        //
        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegisterDto userForRegisterDto)
        {
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username ya existe");

            var userToCreate = new User
            {
                Username = userForRegisterDto.Username,
                NombreCompleto = userForRegisterDto.NombreCompleto,
                Email = userForRegisterDto.Email,
                Created = DateTime.Now,
                LastActive = DateTime.Now,
                EstadoId = 1
                
            };

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);
            return StatusCode(201);
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

            var createdUser = await _repo.Update(userToCreate);
            return StatusCode(201);
        }
        


        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            var userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };
            
            ListarMenusxRolParameter Param = new  ListarMenusxRolParameter
            {
               idRol = 1
            };

            ListarMenusxRolResult pantallas = (ListarMenusxRolResult)  _repo_Menu.Execute(Param);

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

            var key = new SymmetricSecurityKey(Encoding.UTF8
             .GetBytes(_config.GetSection("AppSettings:Token").Value));

             var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

             var tokenDescriptor = new SecurityTokenDescriptor
             {
                 Subject = new ClaimsIdentity(claims),
                 Expires = DateTime.Now.AddDays(1),
                 SigningCredentials = creds
             };

             var tokenHandler = new JwtSecurityTokenHandler();

             var token = tokenHandler.CreateToken(tokenDescriptor);

             return Ok(new {
                 menu = final,
                 token = tokenHandler.WriteToken(token)
             });


        }


    }
}