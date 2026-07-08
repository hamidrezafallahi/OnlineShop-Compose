using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace OnlineShop.Infrastructure.Persistence.Configurations
{
    public class ProductSpecificationConfiguration : IEntityTypeConfiguration<ProductSpecification>
    {
        public void Configure(EntityTypeBuilder<ProductSpecification> builder)
        {
            // ===== Key =====
            builder.HasKey(s => s.Id);

            builder.Property(s => s.Id)
                   .ValueGeneratedOnAdd();

            // ===== Properties =====
            builder.Property(s => s.Key)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(s => s.Value)
                   .IsRequired()
                   .HasMaxLength(500);

            // ===== Relation with Product =====
            builder.HasOne(s => s.Product)
                   .WithMany(p => p.Specifications)
                   .HasForeignKey(s => s.ProductId)
                   .OnDelete(DeleteBehavior.Cascade);

            // ===== Audit (optional) =====
            builder.Property(s => s.CreatedAt)
                   .IsRequired();

            builder.Property(s => s.UpdatedAt);

            builder.Property(s => s.DeletedAt);
            builder.Property(s => s.IsDeleted)
                   .IsRequired();
        }
    }
}
