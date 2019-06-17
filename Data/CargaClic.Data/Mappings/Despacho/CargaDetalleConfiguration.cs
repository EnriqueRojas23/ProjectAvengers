
using CargaClic.Domain.Despacho;
using CargaClic.Domain.Prerecibo;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Prerecibo
{
    public class CargaDetalleConfiguration: IEntityTypeConfiguration<CargaDetalle>
    {
        public void Configure(EntityTypeBuilder<CargaDetalle> builder)
        {
            builder.ToTable("CargaDetalle","Despacho");
            builder.HasKey(x=>x.Id);
        }
    }
}