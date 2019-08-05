
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Facturacion;
using CargaClic.ReadRepository.Contracts.Despacho.Results;
using CargaClic.Repository.Contracts.Inventario;
using CargaClic.Repository.Interface;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository
{
    public class FacturacionRepository : IFacturacionRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public FacturacionRepository(DataContext context,IConfiguration config)
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

        public async Task<long> GenerarComprobante(ComprobanteForRegister command)
        {
            Preliquidacion entity ;
            Comprobante comprobante;
            ComprobanteDetalle comprobantedetalle;
            using(var transaction = _context.Database.BeginTransaction())
            {
                entity = await _context.Preliquidacion.Where(x=>x.Id==command.PreliquidacionId).SingleOrDefaultAsync();
               // entity_detalles = await _context.PreliquidacionDetalle.Where(x=>x.PreliquidacionId == command.PreliquidacionId).ToListAsync();
                
                comprobante = new Comprobante();
                comprobante.Igv = entity.Igv;
                comprobante.NumeroComprobante = "001-005498";
                comprobante.PreliquidacionId = command.PreliquidacionId;
                comprobante.SubTotal = entity.SubTotal;
                comprobante.TipoComprobanteId = 1;
                comprobante.Total = entity.Total;
                comprobante.UsuarioRegistroId = 1;


                await _context.AddAsync<Comprobante>(comprobante);
                await _context.SaveChangesAsync();

                // foreach (var item in entity_detalles)
                // {
                    comprobantedetalle = new ComprobanteDetalle();
                    comprobantedetalle.ComprobanteId =  comprobante.Id;
                    comprobantedetalle.Descripcion = "Por almacenamiento" ;
                    comprobantedetalle.Subtotal = entity.SubTotal;
                    comprobantedetalle.Total = entity.Total;
                    comprobantedetalle.Igv = entity.Igv;
                    await _context.AddAsync<ComprobanteDetalle>(comprobantedetalle);
                    await _context.SaveChangesAsync();
                // }

                transaction.Commit();


               
            }
            return 1;
        }
        public async Task<long> Almacenamiento(InventarioForStorage command)
        {

            var dominio = await _context.InventarioGeneral.Where(x=>x.Id == command.Id).SingleOrDefaultAsync();
            var invlod  = await _context.InvLod.Where(x=>x.Id == dominio.LodId).SingleOrDefaultAsync();

           

            /// Lógica para cerrar pedido

            using(var transaction = _context.Database.BeginTransaction())
            {
               
                try
                {
                        invlod.UbicacionId =   invlod.UbicacionProxId.Value;
                        invlod.UbicacionProxId = null;
                         
                        await _context.SaveChangesAsync();
                        transaction.Commit();
                }
                catch (Exception ex)
                    {
                        transaction.Rollback();  
                        throw ex; 
                    }
                return command.Id;
            }

            
        }
        public async Task<long> GenerarPreliquidacion(PreliquidacionForRegister command)
        {

            IEnumerable<GetPendientesLiquidacion> result ;
            Decimal SubTo = 0;

            var parametros = new DynamicParameters();
            parametros.Add("ClienteId", dbType: DbType.Int32, direction: ParameterDirection.Input, value: command.ClienteId);

            using (IDbConnection conn = Connection)
            {
                string sQuery = "[Facturacion].[pa_listarpendientespreliquidacion]";
                //conn.Open();
                 result = await conn.QueryAsync<GetPendientesLiquidacion>(sQuery,
                                                                           parametros
                                                                          ,commandType:CommandType.StoredProcedure
                  );
            }
            foreach (var item in result)
            {
                  SubTo = SubTo + item.Total ;
            }

            using(var transaction = _context.Database.BeginTransaction())
            {
                var preliquidacion = new  Preliquidacion();
                try
                {
                preliquidacion.AlmacenId = 1;
                preliquidacion.ClienteId = command.ClienteId;
                preliquidacion.FechaLiquidacion = DateTime.Now;
                preliquidacion.SubTotal = SubTo;
                preliquidacion.Igv = Convert.ToDecimal(Convert.ToDouble(SubTo) * 0.18);
                preliquidacion.Total = preliquidacion.SubTotal + preliquidacion.Igv;
                preliquidacion.EstadoId = (int) Constantes.EstadoPreliquidacion.Pendiente;
                
                await _context.AddAsync<Preliquidacion>(preliquidacion);
                await _context.SaveChangesAsync();

                PreliquidacionDetalle detalle ;
                foreach (var item in result)
                {
                    detalle = new PreliquidacionDetalle();
                    detalle.FechaIngreso = Convert.ToDateTime(item.FechaIngreso);
                    detalle.Ingreso = item.Ingreso;
                    detalle.Montacarga = item.MontaCarga;
                    detalle.Movilidad = item.Movilidad;
                    detalle.Pos = item.Posdia;
                    detalle.PreliquidacionId = preliquidacion.Id;
                    detalle.ProductoId = item.ProductoId;
                    detalle.Salida = item.Salida;
                    detalle.Seguro = item.Seguro;
                    await _context.AddAsync<PreliquidacionDetalle>(detalle);
                    
                }
                await _context.SaveChangesAsync();
              

                preliquidacion.NumLiquidacion = "030-" + preliquidacion.Id.ToString().PadLeft(6,'0');
                await _context.SaveChangesAsync();
                transaction.Commit();

                }
                catch (Exception ex)
                {
                    transaction.Rollback();  
                    throw ex; 
                }
                return 1;
            }

        }
    }
}
    
