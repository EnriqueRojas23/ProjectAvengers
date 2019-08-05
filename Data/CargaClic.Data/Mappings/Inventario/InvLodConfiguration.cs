using CargaClic.Domain.Inventario;
using CargaClic.Domain.Mantenimiento;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Inventario
{
    public class InvLodConfiguration : IEntityTypeConfiguration<InvLod>
    {
        public void Configure(EntityTypeBuilder<InvLod> builder)
        {
            builder.ToTable("InvLod","Inventario");
            builder.HasKey(x=>x.Id);
        }
    }
}