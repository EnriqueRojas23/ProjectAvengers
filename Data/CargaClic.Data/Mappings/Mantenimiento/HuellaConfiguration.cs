using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class HuellaConfiguration : IEntityTypeConfiguration<Huella>
    {
        public void Configure(EntityTypeBuilder<Huella> builder)
        {
            builder.ToTable("Huella","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.ProductoId).IsRequired();
            builder.Property(x=>x.Caslvl).IsRequired();
        }

    }
}