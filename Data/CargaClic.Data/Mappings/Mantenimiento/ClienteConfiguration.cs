using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Mantenimiento
{
    public class ClienteConfiguration : IEntityTypeConfiguration<Cliente>
    {
        public void Configure(EntityTypeBuilder<Cliente> builder)
        {
            builder.ToTable("Cliente","Mantenimiento");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.Nombre).HasMaxLength(50).IsRequired();
            builder.Property(x=>x.Documento).HasMaxLength(11).IsRequired();
        }
    }
}