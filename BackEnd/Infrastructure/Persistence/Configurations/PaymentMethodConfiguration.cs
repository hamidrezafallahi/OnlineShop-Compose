using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class PaymentMethodConfiguration : IEntityTypeConfiguration<PaymentMethod>
    {
        public void Configure(EntityTypeBuilder<PaymentMethod> builder)
        {
            // ================= Key =================
            builder.HasKey(pm => pm.Id);
            builder.Property(pm => pm.Id).ValueGeneratedOnAdd();

            // ================= Properties =================
            builder.Property(pm => pm.Title)
                   .HasMaxLength(100)
                   .IsRequired();

            builder.Property(pm => pm.Code)
                   .HasMaxLength(50)
                   .IsRequired();

            builder.Property(pm => pm.IsOnline)
                   .IsRequired();

            builder.Property(pm => pm.IsActive)
                   .IsRequired();

            builder.Property(pm => pm.DisplayOrder)
                   .IsRequired();

            builder.Property(pm => pm.ConfigJson)
                   .HasColumnType("nvarchar(max)");

            // ================= Relations =================
            builder.HasMany(pm => pm.Payments)
                   .WithOne(p => p.PaymentMethod)
                   .HasForeignKey(p => p.PaymentMethodId)
                   .OnDelete(DeleteBehavior.Restrict); // جلوگیری از حذف cascade
        }
    }
}
