
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Despacho
{
    public class ShipmentConfiguration: IEntityTypeConfiguration<Shipment>
    {
        public void Configure(EntityTypeBuilder<Shipment> builder)
        {
            builder.ToTable("Shipment","Despacho");
            builder.HasKey(x=>x.Id);
            builder.Property(x=>x.ShipmentNumber).HasMaxLength(8).IsRequired();
        }
    }
}