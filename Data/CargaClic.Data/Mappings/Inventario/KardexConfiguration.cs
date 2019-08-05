

using CargaClic.Domain.Inventario;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Inventario
{
    public class KardexConfiguration: IEntityTypeConfiguration<Kardex>
    {
        public void Configure(EntityTypeBuilder<Kardex> builder)
        {
            builder.ToTable("Kardex","Inventario");
            builder.HasKey(x=>x.Id);
        }
    }
}