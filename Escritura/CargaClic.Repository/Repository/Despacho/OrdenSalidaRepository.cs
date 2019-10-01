
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Despacho;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Common;
using CargaClic.Data;
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Inventario;
using CargaClic.Repository.Contracts.Despacho;
using CargaClic.Repository.Contracts.Inventario;
using CargaClic.Repository.Interface;
using Dapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Repository
{
    public class OrdenSalidaRepository : IOrdenSalidaRepository
    {
        private readonly DataContext _context;
        private readonly IConfiguration _config;

        public OrdenSalidaRepository(DataContext context,IConfiguration config)
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

        public async Task<long> matchTransporteCarga(string CargasId, long EquipoTransporteId)
        {
            string[] prm = CargasId.Split(',');
            using(var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    foreach (var item in prm)
                    {
                        var cargaDb = await _context.Shipment.SingleOrDefaultAsync(x=>x.Id == Int64.Parse(item));
                        cargaDb.EquipoTransporteId = EquipoTransporteId;
                        cargaDb.EstadoId = (int) Constantes.EstadoCarga.Confirmado;
                        await _context.SaveChangesAsync();
                    }
                }
                catch(Exception)
                {
                    transaction.Rollback();
                    throw;
                }
                transaction.Commit();
                return 1;
            }
        }
        public async Task<long> MovimientoSalida(InventarioForStorage command)
        {
            KardexGeneral kardex ;
           
            using(var transaction = _context.Database.BeginTransaction())
            {
                var pckrk = await _context.Pckwrk.Where(x=>x.Id == command.Id).SingleOrDefaultAsync();
                var wrk = await _context.Wrk.Where(x=>x.Id == pckrk.WrkId).SingleOrDefaultAsync();
                var dominio = await _context.InventarioGeneral.Where(x=>x.Id == pckrk.InventarioId).Include(z=>z.InvLod).SingleOrDefaultAsync();
               
                try
                {
                       
                         pckrk.Confirmado = true;
                         dominio.InvLod.UbicacionId =   wrk.DestinoId.Value;
                         dominio.InvLod.UbicacionProxId = null;

                         pckrk.DestinoId = null;
                         pckrk.UbicacionId =  wrk.DestinoId.Value;
                         

                        /// Lógica para cerrar pedido
                        var detalles = await _context.Pckwrk.Where(x=>x.WrkId == wrk.Id).ToListAsync();
                                    
                        if(detalles.Where(x=>x.Confirmado == true).ToList().Count > 0)
                            wrk.FechaInicio = DateTime.Now;

                            foreach (var item in detalles)
                            {
                                if(item.Confirmado == false){
                                    wrk.EstadoId  = (Int32)Constantes.EstadoWrk.Iniciado;
                                }
                                else wrk.EstadoId = (Int32)Constantes.EstadoWrk.Terminado;
                            }

                         await _context.SaveChangesAsync();


                         //Registrar el movimiento en el kardex
                        kardex = new KardexGeneral();
                        kardex.Almacenado = false;
                        kardex.EstadoId = dominio.EstadoId;
                        kardex.FechaExpire = dominio.FechaExpire;
                        kardex.FechaManufactura = dominio.FechaManufactura;
                        kardex.FechaRegistro = DateTime.Now;
                        kardex.HuellaId = dominio.HuellaId;
                        kardex.LineaId = dominio.LineaId;
                        kardex.LodId = dominio.LodId;
                        kardex.LotNum = dominio.LotNum;
                        kardex.Movimiento = "S";
                        kardex.OrdenReciboId = dominio.OrdenReciboId;
                        kardex.Peso = dominio.Peso;
                        kardex.ProductoId = dominio.ProductoId;
                        kardex.PropietarioId = dominio.ClienteId;
                        kardex.ShipmentLine = pckrk.ShipmentLineId;
                        kardex.UntQty = pckrk.CantidadRetiro * -1 ; //dominio.UntQty * -1;
                        kardex.UsuarioIngreso = 1;
                        kardex.InventarioId = dominio.Id;
                        
                        _context.KardexGeneral.Add(kardex);

                         //Eliminar el inventario

                          if(pckrk.CantidadRetiro == pckrk.CantidadPallet)
                          {
                                var eliminar = await _context.InventarioGeneral.Where(x=>x.Id == dominio.Id).SingleAsync();
                                _context.InventarioGeneral.Remove(eliminar);
                          }
                          else
                          { 
                                dominio.Almacenado = true;
                                dominio.UntQty = pckrk.CantidadPallet - pckrk.CantidadRetiro;

                          }

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
        public async Task<long> PlanificarPicking(PickingPlan cargaForRegister)
        {
            cargaForRegister.ids = cargaForRegister.ids.Substring(1, cargaForRegister.ids.Length -1);

            string[] prm = cargaForRegister.ids.Split(',');
            List<long> ids= new List<long>(); ;

            Shipment dominio  ;
            ShipmentLine shipmentline;
            Pckwrk pckwrk;
            Wrk wrk;

            OrdenSalida ordenSalida ;
            List<OrdenSalida> ordenesSalida ;
            List<List<OrdenSalida>> grupos ;
            List<long> agrupado = new List<long>();

            int recaudado_individual ;
            List<OrdenSalidaDetalle> ordenesSalidaDetalle;
           


            using(var transaction = _context.Database.BeginTransaction())
            {

                ordenesSalidaDetalle = new List<OrdenSalidaDetalle>();     
                ordenesSalida = new List<OrdenSalida>();
                foreach (var item in prm)
                {
                    ordenSalida = await _context.OrdenSalida.Where(x=>x.Id == Convert.ToInt64(item)).SingleOrDefaultAsync();
                    ordenesSalida.Add(ordenSalida);
                    ordenesSalidaDetalle.AddRange(await _context.OrdenSalidaDetalle.Where(x=>x.OrdenSalidaId == ordenSalida.Id).ToListAsync());
                } 
                //Agrupar por cliente y destino
                grupos = new List<List<OrdenSalida>>();
                foreach (var item in ordenesSalida)
                {
                   
                    if(agrupado.Where(x=>x == item.Id).Count() > 0){
                        continue;
                    }
                    
                    var resp = ordenesSalida.Where(x=>x.PropietarioId == item.PropietarioId
                                             && x.DireccionId == item.DireccionId).ToList();
                    resp.ForEach(x=> {
                        agrupado.Add(x.Id);
                    });
                    grupos.Add(resp);
                }

                try
                {
                   foreach (var grupo in grupos)
                   {

                    //Crear Trabajo
                    wrk = new Wrk();
                    wrk.EstadoId =(int) Constantes.EstadoWrk.Pendiente;
                    wrk.FechaRegistro = DateTime.Now;
                    wrk.UsuarioId =  1;
                    wrk.PropietarioId = grupo[0].PropietarioId;
                    wrk.DireccionId = grupo[0].DireccionId;
                
                    await _context.Wrk.AddAsync(wrk);
                    await _context.SaveChangesAsync();

                    wrk.WorkNum = wrk.Id.ToString().PadLeft(7,'0');
                    await _context.SaveChangesAsync();

                    foreach (var item in grupo)
                    {
                        // agrupar por cliente y por destino

                        #region CabeceraShipment

                        dominio = new Shipment();
                        //dominio.EquipoTransporteId = null;
                        dominio.EstadoId = (Int16)  Constantes.EstadoCarga.Pendiente;
                        dominio.FechaConfirmacion = null;
                        dominio.FechaRegistro = DateTime.Now;
                        dominio.FechaSalida = null;
                        dominio.ManifiestoId = null;
                        dominio.ShipmentNumber = "";
                        dominio.Observacion = "";
                        dominio.PropietarioId = item.PropietarioId;
                        dominio.ClienteId =  item.ClienteId;
                        dominio.DireccionId = item.DireccionId;
                        dominio.UsuarioAsignado = 1;
                        dominio.UsuarioRegistro = 1;

                        await _context.Shipment.AddAsync(dominio);
                        await _context.SaveChangesAsync();

                        dominio.ShipmentNumber = dominio.Id.ToString().PadLeft(7,'0');
                        item.EstadoId = (Int16)  Constantes.EstadoOrdenSalida.Planificado;
                        item.CargaId = dominio.Id;
 
                        await _context.SaveChangesAsync();

                        #endregion

                       

                        var detalles =  ordenesSalidaDetalle.Where(x=>x.OrdenSalidaId == item.Id).ToList();
                        foreach (var item2 in detalles)
                        {

                            shipmentline = new ShipmentLine();

                            shipmentline.EstadoId = (Int16)  Constantes.EstadoCarga.Pendiente;
                            shipmentline.HuellaId = item2.HuellaId;
                            shipmentline.LineaId = item2.Id;
                            shipmentline.Lote = item2.Lote;
                            shipmentline.ProductoId = item2.ProductoId;
                            shipmentline.UnidadMedidaId = item2.UnidadMedidaId;
                            shipmentline.ShipmentId = dominio.Id;
                            shipmentline.Cantidad = item2.Cantidad;


                            await _context.ShipmentLine.AddAsync(shipmentline);
                            await _context.SaveChangesAsync();

                            //aca bifurca si es se hace por vencimiento o si no tiene el pedido por lote.
                            List<InventarioGeneral> result ;
                            if(item2.Lote == null)
                            {

                                        if(item2.EstadoId == 10)
                                        {
                                                result = (from a in _context.InventarioGeneral 
                                                .Include(z=>z.InvLod)
                                                where (a.ProductoId == item2.ProductoId  
                                                 & a.Almacenado == true 
                                                && (a.EstadoId == (Int16) Constantes.EstadoInventario.Disponible
                                                ||  a.EstadoId == (Int16) Constantes.EstadoInventario.Merma)
                                                   )
                                                            select a)
                                                .OrderBy(x=>x.FechaExpire)
                                                .OrderBy(x=>x.UntQty).ToList();
                                        }
                                        else {


                                        result = (from a in _context.InventarioGeneral 
                                            .Include(z=>z.InvLod)
                                            where (a.ProductoId == item2.ProductoId  && a.EstadoId == item2.EstadoId &
                                                        a.Almacenado == true 
                                                        )
                                                        select a)
                                            .OrderBy(x=>x.FechaExpire)
                                            .OrderBy(x=>x.UntQty).ToList();
                                        }
                                        
                            }
                            else
                            {

                                       if(item2.EstadoId == 10)
                                        {
                                                result = (from a in _context.InventarioGeneral 
                                                .Include(z=>z.InvLod)
                                                where (a.ProductoId == item2.ProductoId  
                                                  & a.Almacenado == true 
                                                  & a.LotNum == item2.Lote
                                                        && (a.EstadoId == (Int16) Constantes.EstadoInventario.Disponible
                                                        ||  a.EstadoId == (Int16) Constantes.EstadoInventario.Merma)
                                                    )
                                                                select a)
                                                    .OrderBy(x=>x.FechaExpire)
                                                    .OrderBy(x=>x.UntQty).ToList();
                                        }
                                        else {
                                        result = (from a in _context.InventarioGeneral 
                                                    .Include(z=>z.InvLod)
                                                    where (a.ProductoId == item2.ProductoId  && a.EstadoId == item2.EstadoId &
                                                                a.Almacenado == true 
                                                                &  a.LotNum == item2.Lote)
                                                                select a)
                                                    .OrderBy(x=>x.FechaExpire)
                                                    .OrderBy(x=>x.UntQty).ToList();
                                        }
                                        
                            }
                          







                                    recaudado_individual = 0;
                                    foreach (var inventario in result)
                                    {
                                        recaudado_individual = recaudado_individual + inventario.UntQty;

                                        if(ids.Where(x=>x == inventario.Id).Count() > 0)
                                               continue;
                                        
                                        pckwrk = new Pckwrk();
                                        pckwrk.CantidadPallet = inventario.UntQty;
                                        pckwrk.FechaExpire = inventario.FechaExpire;
                                        pckwrk.HuellaDetalleId = inventario.HuellaId;
                                        pckwrk.OrdenSalidaId = item2.OrdenSalidaId;
                                        pckwrk.ProductoId = inventario.ProductoId;
                                        pckwrk.PropietarioId = item.PropietarioId;
                                        pckwrk.ShipmentLineId = shipmentline.Id;
                                        pckwrk.UbicacionId = inventario.InvLod.UbicacionId;
                                        pckwrk.WrkId = wrk.Id;
                                        pckwrk.LodNum = inventario.InvLod.LodNum;
                                        pckwrk.InventarioId = inventario.Id;
                                        pckwrk.Confirmado = false;
                                        pckwrk.OrdenReciboId = inventario.OrdenReciboId;
                                        pckwrk.LineaId = inventario.LineaId;
                                        pckwrk.FechaIngreso =  inventario.FechaRegistro;
                                        pckwrk.LotNum = inventario.LotNum;
                                        inventario.Almacenado = false;
                                        inventario.ShipmentLine = shipmentline.Id;

                                        ids.Add(inventario.Id);

                                        if(recaudado_individual <= item2.Cantidad) {
                                            pckwrk.CantidadRetiro = inventario.UntQty;
                                            pckwrk.Completo = true;

                                            await _context.Pckwrk.AddAsync(pckwrk);
                                            await _context.SaveChangesAsync();
                                        }
                                        else {
                                            pckwrk.CantidadRetiro =item2.Cantidad -  (recaudado_individual - inventario.UntQty);
                                            if(pckwrk.CantidadRetiro == 0) 
                                                break;
                                            pckwrk.Completo = false;
                                 
                                            await _context.Pckwrk.AddAsync(pckwrk);
                                            await _context.SaveChangesAsync();

                                            break;
                                        }
                                    }
                        }
                    }
                   }
                  transaction.Commit();
                }
                catch (System.Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }
            return 1;
        }

        public async Task<long> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister)
        {

            OrdenSalida ordensalida  ;
            
            
            ordensalida = new OrdenSalida();
            ordensalida.Activo = true;
            ordensalida.AlmacenId = 1;
            ordensalida.EquipoTransporteId = null;
            ordensalida.EstadoId = (Int32) Constantes.EstadoOrdenSalida.Creado;
            ordensalida.FechaRegistro = DateTime.Now;
            ordensalida.FechaRequerida = Convert.ToDateTime(ordenSalidaForRegister.FechaRequerida);
            ordensalida.GuiaRemision = ordenSalidaForRegister.GuiaRemision;
            ordensalida.HoraRequerida = ordenSalidaForRegister.HoraRequerida;
            ordensalida.NumOrden = ordenSalidaForRegister.NumOrden;
            ordensalida.Propietario = ordenSalidaForRegister.Propietario;
            ordensalida.PropietarioId = ordenSalidaForRegister.PropietarioId;
            ordensalida.ClienteId = ordenSalidaForRegister.ClienteId;
            ordensalida.UbicacionId = null;
            ordensalida.UsuarioRegistro = 1;
            ordensalida.DireccionId = ordenSalidaForRegister.IdDireccion;
            ordensalida.NumOrden = "";
            ordensalida.OrdenCompraCliente = ordenSalidaForRegister.OrdenCompraCliente;


            using(var transaction = _context.Database.BeginTransaction())
            {
        

                await _context.OrdenSalida.AddAsync(ordensalida);
                await _context.SaveChangesAsync();

                ordensalida.NumOrden = (ordensalida.Id).ToString().PadLeft(7,'0');
                await _context.SaveChangesAsync();

                transaction.Commit();
                return ordensalida.Id;
            }
        }

        public async Task<long> RegisterOrdenSalidaDetalle(OrdenSalidaDetalleForRegister command)
        {
            OrdenSalidaDetalle dominio ;
            List<InventarioGeneral> inventario  ;
            string linea = "";
            int total = 0;

            var detalles =  _context.OrdenSalidaDetalle.Where(x=>x.OrdenSalidaId == command.OrdenSalidaId);

            if(detalles.Count() == 0)
                linea = "0001";
            else {
                 linea = detalles.Max(x=>x.Linea).ToString();
                 linea = (Convert.ToInt32(linea) + 1).ToString().PadLeft(4,'0');
            }

            if(command.Lote == "")
            {
                if(command.EstadoID == 10)
                {
                        inventario =  _context.InventarioGeneral.Where(
                        x=>x.ProductoId ==  command.ProductoId
                        && x.EstadoId == (Int16) Constantes.EstadoInventario.Disponible
                        ||  x.EstadoId == (Int16) Constantes.EstadoInventario.Merma
                        ).ToList();
                }
                else {
                        inventario =  _context.InventarioGeneral.Where(
                        x=>x.ProductoId ==  command.ProductoId
                        && x.EstadoId == command.EstadoID
                        ).ToList();
                }
            }
            else{
                if(command.EstadoID == 10)
                {
                        inventario =  _context.InventarioGeneral.Where(
                        x=>x.ProductoId ==  command.ProductoId
                        && x.LotNum == command.Lote
                        && x.EstadoId == (Int16) Constantes.EstadoInventario.Disponible
                        ||  x.EstadoId == (Int16) Constantes.EstadoInventario.Merma
                        ).ToList();
                }
                else {
                        inventario =  _context.InventarioGeneral.Where(
                        x=>x.ProductoId ==  command.ProductoId
                        && x.LotNum == command.Lote
                        && x.EstadoId == command.EstadoID
                        ).ToList();
                }
            }


            

            inventario.ForEach(x=> total = total + x.UntQty );

            if(total < command.Cantidad){
                throw new ArgumentException("No existen productos sufientes en el inventario");
            }
            
            total = 0;
            if(command.Lote != null){
                var existen = inventario.Where(x=>x.LotNum == command.Lote).ToList();
                existen.ForEach(x=> total = total + x.UntQty );

                if(total < command.Cantidad){
                    throw new ArgumentException("No existen productos sufientes en el inventario");
                }
            }
            


            dominio = new OrdenSalidaDetalle();
            dominio.Cantidad = command.Cantidad;
            dominio.Completo = command.Completo;
            dominio.EstadoId = command.EstadoID; 
            dominio.HuellaId = command.HuellaId;
            dominio.Linea = linea;
            dominio.Lote = command.Lote;
            dominio.OrdenSalidaId = command.OrdenSalidaId;
            dominio.ProductoId = command.ProductoId;
            dominio.UnidadMedidaId = command.UnidadMedidaId;

            
            using(var transaction = _context.Database.BeginTransaction())
            {
        

                await _context.OrdenSalidaDetalle.AddAsync(dominio);
                await _context.SaveChangesAsync();

                transaction.Commit();
                return dominio.Id;
            }


        }
        public async Task<long> assignmentOfDoor(AsignarPuertaSalida asignarPuertaSalida)
        {

            string[] prm = asignarPuertaSalida.ids.Split(',');
            Wrk wrk ;

            using(var transaction = _context.Database.BeginTransaction())
            {
                foreach (var item in prm)
                {
                    wrk = await _context.Wrk.SingleOrDefaultAsync(x=>x.Id == Convert.ToInt64(item));
                    wrk.DestinoId = asignarPuertaSalida.PuertaId;
                    var WrkDetail = await _context.Pckwrk.Where(x=>x.WrkId == wrk.Id).ToListAsync();
                    foreach (var detail in WrkDetail)
                    {
                          var dominio = await _context.InventarioGeneral.Where(x=>x.Id == detail.InventarioId).Include(z=>z.InvLod).SingleOrDefaultAsync();
                          dominio.InvLod.UbicacionProxId = wrk.DestinoId.Value;

                          detail.DestinoId =  wrk.DestinoId.Value;
                    }
                    await _context.SaveChangesAsync();
                }
                var ubicacionDb = await _context.Ubicacion.SingleOrDefaultAsync(x=>x.Id == asignarPuertaSalida.PuertaId);
                ubicacionDb.EstadoId =  9; //Lleno
                await _context.SaveChangesAsync();

                transaction.Commit();

                return ubicacionDb.Id;
            }
        }

        public async Task<long> assignmentOfUser(AsignarUsuarioSalida asignarPuertaSalida)
        {
            string[] prm = asignarPuertaSalida.ids.Split(',');
             Wrk wrk ;

            using(var transaction = _context.Database.BeginTransaction())
            {
                foreach (var item in prm)
                {
                    wrk = await _context.Wrk.SingleOrDefaultAsync(x=>x.Id == Convert.ToInt64(item));
                    
                    wrk.UsuarioId = asignarPuertaSalida.UserId;
                    wrk.FechaAsignacion = DateTime.Now;
                    wrk.EstadoId = (int) Constantes.EstadoWrk.Asignado;
                    await _context.SaveChangesAsync();


                    var detalles  =  await _context.Pckwrk.Where(x=>x.WrkId == wrk.Id).ToListAsync();
                    foreach (var item2 in detalles)
                    {
                        var orden =  await _context.OrdenSalida.Where(x=>x.Id == item2.OrdenSalidaId).SingleOrDefaultAsync();
                        orden.EstadoId = (Int16) Constantes.EstadoOrdenSalida.Asignado;
                         await _context.SaveChangesAsync();
                    }

                }
                transaction.Commit();

                return 1;
            }
        }

        public async Task<long> RegisterCarga(CargaForRegister command)
        {
            command.ids  = command.ids.Substring(1,command.ids.Length - 1);
            string[] prm = command.ids.Split(',');

            ShipmentLine sl ;
            Carga carga  ;
            
            
            carga = new Carga();
            carga.EstadoId = (int) Constantes.EstadoCarga.Pendiente;
            carga.FechaRegistro = DateTime.Now;
            carga.NumCarga = "";
            carga.UsuarioRegistroId = command.UsuarioRegistroId;

            using(var transaction = _context.Database.BeginTransaction())
            {
        
                await _context.Carga.AddAsync(carga);
                await _context.SaveChangesAsync();

                carga.NumCarga = "OC0-" + (carga.Id).ToString().PadLeft(6,'0');
                await _context.SaveChangesAsync();

                 foreach (var item in prm)
                 {
                     sl = 
                        await _context.ShipmentLine.Where(x=>x.Id == Convert.ToInt64(item)).SingleOrDefaultAsync();

                    //sl.CargaId = carga.Id;
                    
                 }
                await _context.SaveChangesAsync();
                transaction.Commit();
                return carga.Id;
            }
        }

        public async Task<long> RegisterSalida(CargaForRegister command)
        {
            string[] prm = command.ids.Split(',');
            Shipment sl ;
            using(var transaction = _context.Database.BeginTransaction())
            {
        
                await _context.SaveChangesAsync();
                foreach (var item in prm)
                 {
                     sl = 
                        await _context.Shipment.Where(x=>x.Id == Convert.ToInt64(item)).SingleOrDefaultAsync();

                    sl.EstadoId = (Int16) Constantes.EstadoCarga.Despachado;
                    sl.FechaSalida = DateTime.Now;

                    var shipmentlines =  await _context.ShipmentLine.Where(x=>x.ShipmentId == sl.Id).ToListAsync();

                    foreach (var item2 in shipmentlines)
                    {
                        var pckrk = await _context.Pckwrk.Where(x=>x.ShipmentLineId == item2.Id).ToListAsync();
                        pckrk.ForEach(x=> {
                            x.FechaSalida = DateTime.Now;
                              _context.Ubicacion.Where(y=>y.Id ==  x.UbicacionId).Single().EstadoId = 10;
                        });
                       

                        var kardex = await _context.KardexGeneral.Where(x=>x.ShipmentLine == item2.Id).ToListAsync();
                        kardex.ForEach(x=> {
                            x.FechaSalida = DateTime.Now;
                        });
                    }

                    
                 }
                await _context.SaveChangesAsync();
                transaction.Commit();
                return 1;
            }
        }
    }
}