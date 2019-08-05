using CargaClic.Domain.Facturacion;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Facturacion
{
    public class PreliquidacionDetalleConfiguration: IEntityTypeConfiguration<PreliquidacionDetalle>
    {
        public void Configure(EntityTypeBuilder<PreliquidacionDetalle> builder)
        {
            builder.ToTable("PreliquidacionDetalle","facturacion");
            builder.HasKey(x=>x.Id);
            
        }
    }
}