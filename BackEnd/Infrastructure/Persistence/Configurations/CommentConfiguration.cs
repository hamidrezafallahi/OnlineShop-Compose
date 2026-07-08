using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Configurations
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(c => c.Id);

            builder.Property(c => c.Id)
                   .ValueGeneratedOnAdd();

            builder.Property(c => c.Content)
                   .IsRequired()
                   .HasMaxLength(2000);

            builder.Property(c => c.TargetTitle)
                    .IsRequired()
                    .HasMaxLength(50);
            builder.Property(c => c.UserName)
                    .IsRequired()
                    .HasMaxLength(50);
            builder.Property(c => c.ParentName)
                    .HasMaxLength(50);
            builder.Property(c => c.IsApproved)
                   .IsRequired();

            // ===== Target =====
            builder.Property(c => c.TargetId)
                   .IsRequired();

            builder.Property(c => c.TargetType)
                   .IsRequired();

            // 🔹 ایندکس مهم (معادل Rate)
            builder.HasIndex(c => new { c.TargetType, c.TargetId });

            // ===== User =====
            builder.Property(c => c.UserId)
                   .IsRequired();

            builder.HasOne(c => c.User)
                   .WithMany()
                   .HasForeignKey(c => c.UserId)
                   .OnDelete(DeleteBehavior.Restrict);

            // ===== Replies =====
            builder.HasOne(c => c.Parent)
                   .WithMany(p => p.Replies)
                   .HasForeignKey(c => c.ParentId)
                   .OnDelete(DeleteBehavior.Restrict);

            // ===== Audit fields =====
            builder.Property(c => c.CreatedAt).IsRequired();
            builder.Property(c => c.UpdatedAt).IsRequired(false);
            builder.Property(c => c.DeletedAt).IsRequired(false);

            builder.Property(c => c.IsDeleted)
                   .HasDefaultValue(false);
        }
    }
}
