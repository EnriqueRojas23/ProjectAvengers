using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class PreliquidacionConfiguration: IEntityTypeConfiguration<Preliquidacion>
    {
        public void Configure(EntityTypeBuilder<Preliquidacion> builder)
        {
            builder.ToTable("Preliquidacion","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}