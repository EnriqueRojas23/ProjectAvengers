
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class ValorTablaConfiguration : IEntityTypeConfiguration<ValorTabla>
    {
        public void Configure(EntityTypeBuilder<ValorTabla> builder)
        {
            builder.ToTable("ValorTabla","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.ValorPrincipal).HasMaxLength(100).IsRequired();
            
        }
    }
}