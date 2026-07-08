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

        // اگر بخوای Seed Data اولیه بزنی
        builder.HasData(
            new Role { Id = 1, RoleName = "SuperAdmin" },
            new Role { Id = 2, RoleName = "Admin" },
            new Role { Id = 3, RoleName = "StoreManager" },
            new Role { Id = 4, RoleName = "Support" },
            new Role { Id = 5, RoleName = "ContentEditor" },
            new Role { Id = 6, RoleName = "Customer" }
        );
    }
}
