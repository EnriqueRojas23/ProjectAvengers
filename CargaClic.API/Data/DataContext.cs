using CargaClic.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CargaClic.API.Data
{
    public class DataContext : DbContext // Usar, modificar o ampliar métodos de esta clase
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {}  
        public DbSet<Value> Values {get;set;}
        public DbSet<User> Users { get; set; }

    }
}