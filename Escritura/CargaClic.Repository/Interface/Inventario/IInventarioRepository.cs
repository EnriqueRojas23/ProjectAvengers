using System;
using System.Threading.Tasks;
using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;
using CargaClic.Repository.Contracts.Inventario;

namespace CargaClic.Repository.Interface
{
    public interface IInventarioRepository
    {
        Task<InventarioGeneral> RegistrarInventario(InventarioForRegister inventarioGeneral);
        Task<long> AssignarUbicacion(InventarioForAssingment inventarioGeneral);
        Task<Guid> FinalizarRecibo(InventarioForFinishRecive inventarioGeneral);
        Task<long> Almacenamiento(InventarioForStorage inventarioGeneral);
        Task<long> RegistrarAjuste(AjusteForRegister ajusteForRegister);
        Task<long> MergeInventario(MergeInventarioRegister mergeInventarioRegister);
        Task<InventarioGeneral> ActualizarInventario(InventarioForEdit inventarioGeneral);
    }
}