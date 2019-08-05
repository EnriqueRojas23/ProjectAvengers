using System;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Despacho;
using CargaClic.Repository.Contracts.Despacho;
using CargaClic.Repository.Contracts.Inventario;

namespace CargaClic.Repository.Interface
{
    public interface IOrdenSalidaRepository
    {
        
        Task<Int64> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister);
        Task<Int64> RegisterOrdenSalidaDetalle(OrdenSalidaDetalleForRegister ordenSalidaForRegister);

        Task<Int64> PlanificarPicking(PickingPlan pickingPlan);
        Task<Int64> matchTransporteCarga(string CargaId, long EquipoTransporteId);
        Task<Int64> MovimientoSalida(InventarioForStorage command);


        Task<Int64> assignmentOfDoor(AsignarPuertaSalida asignarPuertaSalida);
        Task<Int64> assignmentOfUser(AsignarUsuarioSalida asignarPuertaSalida);

        Task<Int64> RegisterCarga(CargaForRegister cargaForRegister);


    }
}