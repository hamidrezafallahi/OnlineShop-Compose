using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
    {
        public void Configure(EntityTypeBuilder<RefreshToken> builder)
        {
            // کلید اصلی
            builder.HasKey(rt => rt.Id);

            builder.Property(rt => rt.Id)
                   .ValueGeneratedOnAdd();

            // فیلدهای اصلی
            builder.Property(rt => rt.Token)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(rt => rt.AccessToken)
                   .IsRequired()
                   .HasMaxLength(500);

            builder.Property(rt => rt.AccessTokenExpiryDate)
                   .IsRequired();

            builder.Property(rt => rt.ExpiryDate)
                   .IsRequired();

            builder.Property(rt => rt.IsRevoked)
                   .IsRequired();

            builder.Property(rt => rt.ReplacedByToken)
                   .HasMaxLength(500);

            builder.Property(rt => rt.CreatedByIp)
                   .IsRequired()
                   .HasMaxLength(50);

            builder.Property(rt => rt.CreatedByUserAgent)
                   .HasMaxLength(200);

            // رابطه با کاربر
            builder.HasOne(rt => rt.User)
                   .WithMany(u => u.RefreshTokens)
                   .HasForeignKey(rt => rt.UserId)
                   .OnDelete(DeleteBehavior.Cascade);

            // فیلدهای تاریخچه
            builder.Property(rt => rt.CreatedAt)
                   .IsRequired();

            builder.Property(rt => rt.UpdatedAt);

            builder.Property(rt => rt.DeletedAt);

            builder.Property(rt => rt.IsDeleted)
                   .IsRequired();

            builder.Property(rt => rt.CreatedBy);
            builder.Property(rt => rt.UpdatedBy);
            builder.Property(rt => rt.DeletedBy);

            builder.Property(rt => rt.IsRevoked)
                   .IsRequired();
        }
    }
}
