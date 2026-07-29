using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoleConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        builder.HasKey(r => r.Id);

        builder.Property(r => r.RoleName)
               .IsRequired()
               .HasMaxLength(100);

        var seedCreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc);
        builder.HasData(
            new { Id = 1, RoleName = "SuperAdmin", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false },
            new { Id = 2, RoleName = "Admin", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false },
            new { Id = 3, RoleName = "StoreManager", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false },
            new { Id = 4, RoleName = "Support", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false },
            new { Id = 5, RoleName = "ContentEditor", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false },
            new { Id = 6, RoleName = "Customer", CreatedAt = seedCreatedAt, IsActive = true, IsDeleted = false }
        );
    }
}
