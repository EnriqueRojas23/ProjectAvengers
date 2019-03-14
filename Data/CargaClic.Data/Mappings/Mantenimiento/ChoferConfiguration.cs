using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class ChoferConfiguration : IEntityTypeConfiguration<Chofer>
    {
        public void Configure(EntityTypeBuilder<Chofer> builder)
        {
            builder.ToTable("Chofer","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.NombreCompleto).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.Dni).HasMaxLength(11).IsRequired();
            builder.Property(x=>x.Brevete).HasMaxLength(11).IsRequired();
            
            

        }
    }
}