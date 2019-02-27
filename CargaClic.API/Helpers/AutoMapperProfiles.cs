using AutoMapper;
using CargaClic.Data;


namespace CargaClic.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // CreateMap<User,UserForDetailedDto>()
            //     .ForMember(dest => dest.Edad , opt => {
            //         opt.ResolveUsing( d => (d.DateOfBirth != null)?d.DateOfBirth.Value.CalcularEdad() : 1);
            //     });
            
        }
    }
}