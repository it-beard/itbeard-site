using Itbeard.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Itbeard.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

        public DbSet<Url> Urls { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            UpdateStructure(builder);
            base.OnModelCreating(builder);
        }

        private void UpdateStructure(ModelBuilder builder)
        {
            builder.Entity<Url>()
                .HasKey(b => new {b.Id});
            
            builder.Entity<Url>()
                .Property(b => b.ShortGuid).HasMaxLength(7);

            builder.Entity<Url>()
                .HasIndex(u => u.ShortGuid)
                .IsUnique();
        }
    }
}
