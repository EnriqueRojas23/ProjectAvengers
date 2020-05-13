using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CargaClic.ReadRepository.Contracts.Mantenimiento.Results;


namespace CargaClic.ReadRepository.Interface.Mantenimiento
{
    public interface IMantenimientoRepository
    {
         Task<IEnumerable<GetAllHuelladetalleResult>> GetAllHuelladetalle(int HuellaId);
         Task<GetProductoResult> GetProducto(Guid ProductoId);
         Task<IEnumerable<GetAllHuellaResult>> GetAllHuella(Guid ProductoId);
         Task<GetAllHuellaResult> GetHuella(int HuellaId);
         Task<IEnumerable<GetAllPropietariosResult>> GetAllPropietarios(String Criterio);
         Task<IEnumerable<GetAllPropietariosResult>> GetAllClientesxPropietarios(int PropietarioId);
         Task<IEnumerable<GetAllPropietariosResult>> GetAllClientes(String Criterio);
         Task<IEnumerable<GetAllDireccionesResult>> GetAllDirecciones(int ClienteId);

         Task<IEnumerable<GetAllDepartamentos>> GetAllDepartamentos();
         Task<IEnumerable<GetAllProvincias>> GetAllProvincias(int DepartamentoId);
         Task<IEnumerable<GetAllDistritos>> GetAllDistritos(int ProvinciaId);

         //Task<IEnumerable<GetAll






    }
}