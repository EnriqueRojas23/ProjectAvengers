
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class ShipmentLineConfiguration: IEntityTypeConfiguration<ShipmentLine>
    {
        public void Configure(EntityTypeBuilder<ShipmentLine> builder)
        {
            builder.ToTable("ShipmentLine","Despacho");
            builder.HasKey(x=>x.Id);
        }
    }
}