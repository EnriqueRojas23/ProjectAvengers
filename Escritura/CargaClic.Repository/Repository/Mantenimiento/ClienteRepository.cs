using System;
using System.Threading.Tasks;
using CargaClic.Data;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Repository.Contracts.Mantenimiento;
using CargaClic.Repository.Interface.Mantenimiento;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository.Repository.Mantenimiento
{
    public class ClienteRepository : IClienteRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public ClienteRepository(DataContext context,IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public async Task<int> OwnerRegister(OwnerForRegister clienteForRegister)
        {
            Propietario propietario = new Propietario();
            propietario.Documento = clienteForRegister.Documento;
            propietario.Nombre = clienteForRegister.Nombre;
            propietario.Activo = true;
            propietario.NombreCorto = clienteForRegister.NombreCorto;
            propietario.TipoDocumentoId = clienteForRegister.TipoDocumentoId;


            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                         await  _context.Propietario.AddAsync(propietario);
                         await _context.SaveChangesAsync();
                         transaction.Commit();
                  }
                  catch (System.Exception ex)
                  {
                        transaction.Rollback(); 
                        var sqlException = ex.InnerException as System.Data.SqlClient.SqlException;
                        if (sqlException.Number == 2601 || sqlException.Number == 2627)
                            throw new ArgumentException("No puede insertar datos duplicados");
                        else
                            throw new ArgumentException("Error al insertar");
                  }
                  return propietario.Id;
            }
        }
        public async Task<int> ClientRegister(ClienteForRegister clienteForRegister)
        {
          
            Cliente cliente;
            

          
            using(var transaction = _context.Database.BeginTransaction())
            {
                  try
                  {
                    cliente = new Cliente();
                    cliente.Documento = clienteForRegister.Documento;
                    cliente.Nombre = clienteForRegister.Nombre;
                    cliente.TipoDocumentoId = clienteForRegister.TipoDocumentoId;

                    await  _context.Cliente.AddAsync(cliente);
                    await _context.SaveChangesAsync();

                    transaction.Commit();
                  }
                  catch (System.Exception ex)
                  {
                        transaction.Rollback(); 
                        var sqlException = ex.InnerException as System.Data.SqlClient.SqlException;
                        if (sqlException.Number == 2601 || sqlException.Number == 2627)
                            throw new ArgumentException("No puede insertar datos duplicados");
                        else
                            throw new ArgumentException("Error al insertar");
                  }
                  return cliente.Id;
                 
            }
        }

        public async Task<int> AttachOwnerClient(OwnerClientForAttach ownerClientForAttach)
        {

             ClientePropietario propietarioxcliente ;
   
             using(var transaction = _context.Database.BeginTransaction())
             {
                  try
                  {
                        propietarioxcliente = new ClientePropietario();
                        propietarioxcliente.PropietarioId = ownerClientForAttach.PropietarioId;
                        propietarioxcliente.ClienteId = ownerClientForAttach.ClienteId;
                        
                        await  _context.ClientePropietario.AddAsync(propietarioxcliente);
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                        
                        return propietarioxcliente.Id;
                 }
                  catch (System.Exception )
                  {
                        transaction.Rollback(); 
                        throw;
                       
                  }
                 
             }
        }

        public async Task<int> AddressRegister(AddressForRegister addressForRegister)
        {
             Direccion direccion ;
   
             using(var transaction = _context.Database.BeginTransaction())
             {
                  try
                  {
                        direccion = new Direccion();
                        direccion.Activo = true;
                        direccion.Clienteid = addressForRegister.ClienteId;
                        direccion.codigo = addressForRegister.Codigo;
                        direccion.direccion = addressForRegister.Direccion;
                        direccion.iddistrito = addressForRegister.DistritoId;
                        
                        await  _context.Direccion.AddAsync(direccion);
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                        
                        return direccion.iddireccion;
                 }
                  catch (System.Exception)
                  {
                        transaction.Rollback(); 
                        throw;
                       
                  }
                 
             }
        }
    }
}