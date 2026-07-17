using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Configurations
{
    public class BlogConfiguration : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder)
        {
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).ValueGeneratedOnAdd();

            // ===== فارسی (کامل) =====
            builder.Property(b => b.TitleFa)
                   .IsRequired()
                   .HasMaxLength(200);

            builder.Property(b => b.IntroFa)          
                   .IsRequired()
                   .HasMaxLength(1000);

            builder.Property(b => b.ContentFa)
                   .IsRequired()
                   .HasColumnType("text");

            builder.Property(b => b.ConclusionFa)      
                   .IsRequired()
                   .HasMaxLength(2000);

            builder.Property(b => b.ExcerptFa)
                   .HasMaxLength(160);  

            builder.Property(b => b.MetaDescriptionFa)
                   .HasMaxLength(160); 

            builder.Property(b => b.MetaKeywordsFa)
                   .HasMaxLength(250);

            // ===== انگلیسی (کامل) =====
            builder.Property(b => b.TitleEn)
                   .IsRequired(false)   
                   .HasMaxLength(200);

            builder.Property(b => b.IntroEn)         
                   .IsRequired(false)
                   .HasMaxLength(1000);

            builder.Property(b => b.ContentEn)
                   .IsRequired(false)
                   .HasColumnType("text");

            builder.Property(b => b.ConclusionEn)      
                   .IsRequired(false)
                   .HasMaxLength(2000);

            builder.Property(b => b.ExcerptEn)
                   .HasMaxLength(160);

            builder.Property(b => b.MetaDescriptionEn)
                   .HasMaxLength(160);

            builder.Property(b => b.MetaKeywordsEn)
                   .HasMaxLength(250);

            // ===== سایر (کامل) =====
            builder.Property(b => b.Slug) 
                   .IsRequired()
                   .HasMaxLength(200);  

            builder.Property(b => b.ThumbnailFile)
                   .HasMaxLength(500);

            builder.Property(b => b.AuthorId)
                   .IsRequired();





            builder.HasIndex(b => b.Slug).IsUnique();   // URL unique

            // ===== روابط =====
            builder.HasOne(b => b.Author)
                   .WithMany(u => u.Blogs)  // 👈 User.Blogs اضافه کن
                   .HasForeignKey(b => b.AuthorId)
                   .OnDelete(DeleteBehavior.Restrict);  // 👈 بهتر از Cascade

            builder.HasMany(b => b.BlogTags)
                   .WithOne(bt => bt.Blog)
                   .HasForeignKey(bt => bt.BlogId)
                   .OnDelete(DeleteBehavior.Cascade);

            builder.ToTable("Blogs");
        }
    }
}