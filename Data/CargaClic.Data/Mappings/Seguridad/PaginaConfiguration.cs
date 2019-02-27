
using CargaClic.Domain.Seguridad;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CargaClic.Data.Mappings.Seguridad
{
    public class PaginaConfiguration : IEntityTypeConfiguration<Pagina>
    {
        public void Configure(EntityTypeBuilder<Pagina> builder)
        {
                builder.ToTable("Paginas","Seguridad");
                builder.HasKey(x => x.Id);
                builder.Property(x=>x.Codigo).HasMaxLength(5).IsRequired();
                builder.Property(x=>x.CodigoPadre).HasMaxLength(5);
                builder.Property(x=>x.Descripcion).HasMaxLength(50).IsRequired();
                builder.Property(x=>x.Link).HasMaxLength(50);
                builder.Property(x=>x.Icono).HasMaxLength(20).IsRequired();
        }
    }
}