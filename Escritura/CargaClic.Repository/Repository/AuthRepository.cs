using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using CargaClic.Data;

using CargaClic.Data.Interface;
using CargaClic.Domain.Seguridad;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Common
{
    public class AuthRepository : IAuthRepository
    {

        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public AuthRepository(DataContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public IDbConnection Connection
        {   
            get
            {
                var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection"));
                try
                {
                     connection.Open();
                     return connection;
                }
                catch (System.Exception)
                {
                    connection.Close();
                    connection.Dispose();
                    throw;
                }
            }
        }

       
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x=>x.Username == username);
            
            if(user == null)
            return null;
            
            if(!VerifyPasswordHash(password,user.PasswordHash,user.PasswordSalt))
                return null;
            
            return user;


        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < computedHash.Length ;  i++)
                {
                    if(computedHash[i] != passwordHash[i])return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;

            using(var transaction = _context.Database.BeginTransaction())
            {
                CreatePasswordHash(password,out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();

                transaction.Commit();
                transaction.Dispose();
                

                return user;
            }
          
        }
        public async Task<User> Update(User user)
        {

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                var userDb = await _context.Users.SingleOrDefaultAsync(x=>x.Id == user.Id);
                userDb.Dni = user.Dni;
                userDb.Email = user.Email;
                userDb.EstadoId = user.EstadoId;
                userDb.NombreCompleto = user.NombreCompleto;
                
                await _context.SaveChangesAsync();

                transaction.Commit();
                transaction.Dispose();
                

                return user;
            }
        }
        public async Task<User> UpdateEstadoId(User user)
        {

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                var userDb = await _context.Users.SingleOrDefaultAsync(x=>x.Id == user.Id);
                userDb.EstadoId = user.EstadoId;
                
                await _context.SaveChangesAsync();

                transaction.Commit();
                transaction.Dispose();
                

                return userDb;
            }
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x=>x.Username == username ) )
            return true;

            return false;
        }

        
    }
}