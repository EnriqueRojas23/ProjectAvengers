using System;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;

namespace CargaClic.Repository.Interface
{
    public interface IOrdenSalidaRepository
    {
        // Task<EquipoTransporte> RegisterEquipoTransporte(EquipoTransporte eq, Guid Id);
        // Task<EquipoTransporte> assignmentOfDoor(long EquipoTransporteId, int UbicacionId);
        // Task<Int64> identifyDetail(OrdenReciboDetalleForIdentifyDto ordenReciboDetalleForIdentifyDto);
        // Task<Guid> closeDetails(Guid OrdenReciboId);
        // Task<Guid> matchTransporteOrdenIngreso(EquipoTransporteForRegisterDto eq);
        
        Task<Int64> RegisterOrdenSalida(OrdenSalidaForRegister ordenSalidaForRegister);
        Task<Int64> RegisterOrdenSalidaDetalle(OrdenSalidaDetalleForRegister ordenSalidaForRegister);

        Task<Int64> RegisterCarga(CargaForRegister ordenSalidaForRegister);
        Task<Int64> matchTransporteCarga(long CargaId, long EquipoTransporteId);

        
    }
}