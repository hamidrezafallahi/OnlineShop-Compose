// Infrastructure/Configurations/RateConfiguration.cs
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Configurations
{
    public class RateConfiguration : IEntityTypeConfiguration<Rate>
    {
        public void Configure(EntityTypeBuilder<Rate> builder)
        {
            builder.HasKey(r => r.Id);

            builder.Property(r => r.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(r => r.UserId)
                   .IsRequired();

            builder.HasOne(r => r.User)
                   .WithMany()
                   .HasForeignKey(r => r.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            builder.Property(r => r.TargetId)
                   .IsRequired();

            builder.Property(r => r.TargetType)
                   .IsRequired();

            // ValueObject Mapping
            builder.OwnsOne(r => r.Value, rv =>
            {
                rv.Property(v => v.Value)
                  .HasColumnName("RateValue")
                  .IsRequired();
            });

            // جلوگیری از رأی تکراری یک کاربر
            builder.HasIndex(r => new { r.UserId, r.TargetId, r.TargetType })
                   .IsUnique();

            // Audit fields
            builder.Property(r => r.CreatedAt).IsRequired();
            builder.Property(r => r.UpdatedAt).IsRequired(false);
            builder.Property(r => r.DeletedAt).IsRequired(false);

            builder.Property(r => r.IsDeleted)
                   .HasDefaultValue(false);
        }
    }
}
