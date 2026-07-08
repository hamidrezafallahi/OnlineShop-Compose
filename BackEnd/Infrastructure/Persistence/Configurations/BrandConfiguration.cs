using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class BrandConfiguration : IEntityTypeConfiguration<Brand>
    {
        public void Configure(EntityTypeBuilder<Brand> builder)
        {
            // تنظیم کلید اصلی و تولید خودکار Id
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd(); // تنظیم برای تولید خودکار Id توسط پایگاه داده

            // تنظیمات ویژگی Name
            builder.Property(b => b.Name)
                   .IsRequired()
                   .HasMaxLength(100);

            // تنظیمات ویژگی LogoUrl
            builder.Property(b => b.LogoUrl)
                   .HasMaxLength(300);

            // تنظیمات ویژگی Description
            builder.Property(b => b.Description)
                   .HasMaxLength(1000);

            // رابطه با محصولات
            builder.HasMany(b => b.Products)
                   .WithOne(p => p.Brand)
                   .HasForeignKey(p => p.BrandId)
                   .OnDelete(DeleteBehavior.SetNull);
        }
    }




}