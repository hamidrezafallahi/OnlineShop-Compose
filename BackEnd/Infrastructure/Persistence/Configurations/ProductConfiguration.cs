using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.ValueObjects;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            // ===== Key =====
            builder.HasKey(p => p.Id);

            builder.Property(p => p.Id)
                   .ValueGeneratedOnAdd();

            // ===== Properties =====
            builder.Property(p => p.Name)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(p => p.Description)
                   .HasMaxLength(1000);


            // ===== Category =====
            builder.HasOne(p => p.Category)
                   .WithMany(c => c.Products)
                   .HasForeignKey(p => p.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);

            // ===== Brand =====
            builder.HasOne(p => p.Brand)
                   .WithMany(b => b.Products)
                   .HasForeignKey(p => p.BrandId)
                   .OnDelete(DeleteBehavior.SetNull);

 

            // ===== Images =====
            builder.HasMany(p => p.Images)
                   .WithOne(i => i.Product)
                   .HasForeignKey(i => i.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ===== ProductOffers =====
            builder.HasMany(p => p.ProductOffers)
                   .WithOne(po => po.Product)
                   .HasForeignKey(po => po.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ===== Specifications (Entity) =====
            builder.HasMany(p => p.Specifications)
                   .WithOne(s => s.Product)
                   .HasForeignKey(s => s.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ===== Dimensions (Value Object) =====
            builder.OwnsOne(p => p.Dimensions, d =>
            {
                d.Property(x => x.Width).HasColumnType("decimal(10,2)");
                d.Property(x => x.Height).HasColumnType("decimal(10,2)");
                d.Property(x => x.Depth).HasColumnType("decimal(10,2)");
                d.Property(x => x.Weight).HasColumnType("decimal(10,2)");
            });

        }
    }
}
