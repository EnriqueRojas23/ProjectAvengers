using System;
using System.Threading.Tasks;
using CargaClic.Domain.Mantenimiento;
using CargaClic.Domain.Prerecibo;

namespace CargaClic.Repository.Interface
{
    public interface IOrdenReciboRepository
    {
        Task<EquipoTransporte> RegisterEquipoTransporte(EquipoTransporte eq, Guid Id);
        Task<OrdenRecibo> assignmentOfDoor(Guid OrdenReciboId, int UbicacionId);
    }
}