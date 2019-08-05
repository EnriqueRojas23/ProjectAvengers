using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Inventario
{
    public class AjusteInventarioConfiguration : IEntityTypeConfiguration<AjusteInventario>
    {
        public void Configure(EntityTypeBuilder<AjusteInventario> builder)
        {
            builder.ToTable("AjusteInventario","Inventario");
            builder.HasKey(x=>x.Id);
        }
    }
}