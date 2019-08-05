

using CargaClic.Domain.Inventario;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Inventario
{
    public class KardexGeneralConfiguration: IEntityTypeConfiguration<KardexGeneral>
    {
        public void Configure(EntityTypeBuilder<KardexGeneral> builder)
        {
            builder.ToTable("KardexGeneral","Inventario");
            builder.HasKey(x=>x.Id);
        }
    }
}