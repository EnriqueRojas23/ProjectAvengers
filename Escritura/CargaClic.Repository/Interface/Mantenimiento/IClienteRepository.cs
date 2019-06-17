using System;
using System.Threading.Tasks;
using CargaClic.Repository.Contracts.Mantenimiento;

namespace CargaClic.Repository.Interface.Mantenimiento
{
    public interface IClienteRepository
    {
        Task<int> OwnerRegister(OwnerForRegister ownerForRegister);
        Task<int> ClientRegister(ClienteForRegister clienteForRegister);
        Task<int> AttachOwnerClient(OwnerClientForAttach ownerClientForAttach);
        Task<int> AddressRegister(AddressForRegister ownerClientForAttach);
    } 
}
