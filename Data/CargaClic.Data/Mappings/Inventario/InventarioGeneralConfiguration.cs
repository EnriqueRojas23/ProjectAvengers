using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Inventario
{
    public class InventarioGeneralConfiguration : IEntityTypeConfiguration<InventarioGeneral>
    {
        public void Configure(EntityTypeBuilder<InventarioGeneral> builder)
        {
            builder.ToTable("InventarioGeneral","Inventario");
            builder.HasKey(x=>x.Id);
        }
    }
}