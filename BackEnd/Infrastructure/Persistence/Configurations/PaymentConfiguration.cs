using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class PaymentConfiguration : IEntityTypeConfiguration<Payment>
    {
        public void Configure(EntityTypeBuilder<Payment> builder)
        {
            builder.HasKey(p => p.Id);
            builder.Property(p => p.Id).ValueGeneratedOnAdd();

            // ================= Amount =================
            builder.Property(p => p.Amount)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            // ================= PaymentDate =================
            builder.Property(p => p.PaymentDate)
                   .IsRequired();

            // ================= Status Enum =================
            builder.Property(p => p.Status)
                   .HasConversion<int>()
                   .IsRequired();

            // ================= TransactionId =================
            builder.Property(p => p.TransactionId)
                   .HasMaxLength(200);

            // ================= PaymentMethod Relation =================
            builder.HasOne(p => p.PaymentMethod)
                   .WithMany(m => m.Payments)
                   .HasForeignKey(p => p.PaymentMethodId)
                   .OnDelete(DeleteBehavior.Restrict);

            // ================= Order Relation =================
            builder.HasOne(p => p.Order)
                   .WithMany(o => o.Payments)
                   .HasForeignKey(p => p.OrderId)
                   .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
 
 
 

 