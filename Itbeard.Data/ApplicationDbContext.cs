using Itbeard.Core;
using Itbeard.Data.Entites;
using Microsoft.EntityFrameworkCore;

namespace Itbeard.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){}

        public DbSet<Url> Urls { get; set; }
        public DbSet<Statistic> Statistics { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            UpdateStructure(builder);
            base.OnModelCreating(builder);
        }

        private void UpdateStructure(ModelBuilder builder)
        {
            #region Url configs
            
            builder.Entity<Url>()
                .HasKey(b => new {b.Id});
            
            builder.Entity<Url>()
                .Property(b => b.ShortName).HasMaxLength(Constants.MaxShortUrlNameLength);

            builder.Entity<Url>()
                .HasIndex(u => u.ShortName)
                .IsUnique();
            
            #endregion
            
            #region Statistic configs
            
            builder.Entity<Statistic>()
                .HasKey(b => new {b.Id});
            
            builder.Entity<Statistic>()
                .HasOne(p => p.Url)
                .WithMany(b => b.Statistics);

            builder.Entity<Statistic>()
                .Property(b => b.IpAddress).HasMaxLength(45);
            builder.Entity<Statistic>()
                .Property(b => b.City).HasMaxLength(100);
            builder.Entity<Statistic>()
                .Property(b => b.Country).HasMaxLength(100);
            builder.Entity<Statistic>()
                .Property(b => b.Country).HasMaxLength(100);
            builder.Entity<Statistic>()
                .Property(b => b.OperationSystem).HasMaxLength(100);
            builder.Entity<Statistic>()
                .Property(b => b.Device).HasMaxLength(100);
            builder.Entity<Statistic>()
                .Property(b => b.Browser).HasMaxLength(100);
            
            #endregion
        }
    }
}
