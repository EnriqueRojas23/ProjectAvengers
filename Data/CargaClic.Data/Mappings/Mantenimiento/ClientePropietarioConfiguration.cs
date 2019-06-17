using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class ClientePropietarioConfiguration : IEntityTypeConfiguration<ClientePropietario>
    {
        public void Configure(EntityTypeBuilder<ClientePropietario> builder)
        {
            builder.ToTable("ClientePropietario","Mantenimiento");
            builder.HasKey(x=>x.Id);

        }
    }
}