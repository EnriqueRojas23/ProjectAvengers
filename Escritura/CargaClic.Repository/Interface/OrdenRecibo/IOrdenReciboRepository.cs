using System;
using System.Threading.Tasks;
using CargaClic.API.Dtos.Recepcion;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;

namespace CargaClic.Repository.Interface
{
    public interface IOrdenReciboRepository
    {
        Task<EquipoTransporte> RegisterEquipoTransporte(EquipoTransporte eq, Guid Id);
        Task<EquipoTransporte> assignmentOfDoor(long EquipoTransporteId, int UbicacionId);
        Task<Int64> identifyDetail(OrdenReciboDetalleForIdentifyDto ordenReciboDetalleForIdentifyDto);
        Task<Guid> closeDetails(Guid OrdenReciboId);
        Task<Guid> matchTransporteOrdenIngreso(EquipoTransporteForRegisterDto eq);
    }
}