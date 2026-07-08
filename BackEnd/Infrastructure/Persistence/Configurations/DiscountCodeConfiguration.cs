using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class DiscountCodeConfiguration : IEntityTypeConfiguration<DiscountCode>
    {
        public void Configure(EntityTypeBuilder<DiscountCode> builder)
        {
            builder.HasKey(d => d.Id);
            builder.Property(d => d.Id).ValueGeneratedOnAdd();

            builder.Property(d => d.Code)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(d => d.Amount)
                   .HasColumnType("decimal(18,2)")
                   .IsRequired();

            builder.Property(d => d.IsPercent)
                   .IsRequired();

            builder.Property(d => d.StartDate)
                   .IsRequired();

            builder.Property(d => d.EndDate)
                   .IsRequired();
        }
    }
}
