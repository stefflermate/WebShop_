using Microsoft.EntityFrameworkCore;
using WebShop_.Server.Models;

namespace WebShop_.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // USER
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("Users");
                entity.HasKey(u => u.Id);
                entity.Property(u => u.Name).HasMaxLength(100);
                entity.Property(u => u.Email).HasMaxLength(255);
                entity.Property(u => u.Role).HasMaxLength(50);
                entity.Property(u => u.ZipCode).HasMaxLength(10);
            });

            // SELLER
            modelBuilder.Entity<Seller>(entity =>
            {
                entity.ToTable("Sellers");
                entity.HasKey(s => s.UserId);
                entity.HasOne(s => s.User)
                      .WithOne(u => u.Seller)
                      .HasForeignKey<Seller>(s => s.UserId);
            });

            // CATEGORY
            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Categories");
                entity.HasKey(c => c.Id);
                entity.Property(c => c.Id).ValueGeneratedOnAdd();
                entity.Property(c => c.Name).HasMaxLength(100).IsRequired();
            });

            // SUBCATEGORY
            modelBuilder.Entity<SubCategory>(entity =>
            {
                entity.ToTable("SubCategories");
                entity.HasKey(sc => sc.Id);
                entity.Property(sc => sc.Name).HasMaxLength(100).IsRequired();

                entity.HasOne(sc => sc.Category)
                      .WithMany(c => c.SubCategories)
                      .HasForeignKey(sc => sc.CategoryId)
                      .OnDelete(DeleteBehavior.Cascade);
            });

            // PRODUCT
            modelBuilder.Entity<Product>(entity =>
            {
                entity.ToTable("Products");
                entity.HasKey(p => p.Id);
                entity.Property(p => p.Name).HasMaxLength(150);
                entity.Property(p => p.Price).HasColumnType("decimal(10,2)");
                entity.Property(p => p.Quantity).IsRequired();

                entity.HasOne(p => p.Seller)
                      .WithMany()
                      .HasForeignKey(p => p.SellerId);

                entity.HasOne(p => p.SubCategory)
                      .WithMany(sc => sc.Products)
                      .HasForeignKey(p => p.SubCategoryId);
            });
        }
    }
}
