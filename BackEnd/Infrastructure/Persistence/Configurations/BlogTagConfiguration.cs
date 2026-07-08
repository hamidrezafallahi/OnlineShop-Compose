using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

public class BlogTagConfiguration : IEntityTypeConfiguration<BlogTag>
{
    public void Configure(EntityTypeBuilder<BlogTag> builder)
    {
         builder.HasKey(bt => bt.Id);
         builder.HasIndex(bt => new { bt.BlogId, bt.TagId }).IsUnique();
         builder.HasOne(bt => bt.Blog)
               .WithMany(b => b.BlogTags)
               .HasForeignKey(bt => bt.BlogId)
               .OnDelete(DeleteBehavior.Cascade); 

        builder.HasOne(bt => bt.Tag)
               .WithMany(t => t.BlogTags)
               .HasForeignKey(bt => bt.TagId)
               .OnDelete(DeleteBehavior.Restrict);  

        builder.ToTable("BlogTags");
    }
}