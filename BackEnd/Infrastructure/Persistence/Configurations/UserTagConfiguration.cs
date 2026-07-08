using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

public class UserTagConfiguration : IEntityTypeConfiguration<UserTag>
{
    public void Configure(EntityTypeBuilder<UserTag> builder)
    {
         builder.HasKey(x => x.Id);
         builder.HasIndex(x => new { x.UserId, x.TagId }).IsUnique();
        builder.HasOne(x => x.User)
               .WithMany(x => x.UserTags)
               .HasForeignKey(x => x.UserId)
               .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(x => x.Tag)
               .WithMany(x => x.UserTags)
               .HasForeignKey(x => x.TagId)
               .OnDelete(DeleteBehavior.Restrict);

        builder.ToTable("UserTags");
    }
}