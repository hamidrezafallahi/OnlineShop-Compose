using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using OnlineShop.Domain.Entities;

namespace OnlineShop.Infrastructure.Configurations
{
    public class SeoSettingConfiguration : IEntityTypeConfiguration<SeoSetting>
    {
        public void Configure(EntityTypeBuilder<SeoSetting> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder.Property(x => x.RoutePath)
                .IsRequired()
                .HasMaxLength(300);

            builder.Property(x => x.MatchType)
                .IsRequired()
                .HasMaxLength(20);

            builder.Property(x => x.TitleFa).HasMaxLength(300);
            builder.Property(x => x.TitleEn).HasMaxLength(300);
            builder.Property(x => x.DescriptionFa).HasMaxLength(1000);
            builder.Property(x => x.DescriptionEn).HasMaxLength(1000);
            builder.Property(x => x.KeywordsFa).HasMaxLength(1000);
            builder.Property(x => x.KeywordsEn).HasMaxLength(1000);
            builder.Property(x => x.CanonicalPath).HasMaxLength(500);
            builder.Property(x => x.OgImageUrl).HasMaxLength(1000);
            builder.Property(x => x.Notes).HasColumnType("text");
            builder.Property(x => x.Priority).HasDefaultValue(0);

            builder.Property(x => x.CreatedAt).IsRequired();
            builder.Property(x => x.IsDeleted).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.IsActive).IsRequired().HasDefaultValue(true);

            builder.HasIndex(x => new { x.RoutePath, x.MatchType, x.IsDeleted });
        }
    }
}
