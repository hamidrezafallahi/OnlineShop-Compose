using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.PersianName)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(c => c.CategoryPersianDesc)
       .IsRequired()
       .HasMaxLength(200);
            builder.Property(c => c.EnglishName)
.IsRequired()
.HasMaxLength(100);
            builder.Property(c => c.CategoryEnglishDesc)
.IsRequired()
.HasMaxLength(200);
            builder.Property(c => c.ImageUrl)
.IsRequired()
.HasMaxLength(200);

            // رابطه والد-فرزند (خودارجاعی)
            builder.HasOne(c => c.ParentCategory)
                   .WithMany(c => c.SubCategories)
                   .HasForeignKey(c => c.ParentCategoryId)
                   .OnDelete(DeleteBehavior.Restrict);
            // رابطه با محصولات
            builder.HasMany(c => c.Products)
                   .WithOne(p => p.Category)
                   .HasForeignKey(p => p.CategoryId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
