using AutoMapper;
using CargaClic.API.Dtos;
using CargaClic.Data;
using CargaClic.Data.Domain.Seguridad;

namespace CargaClic.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForDetailedDto>()
                .ForMember(dest => dest.Edad , opt => {
                    opt.ResolveUsing( d => d.DateOfBirth.CalcularEdad());
                });
            
        }
    }
}