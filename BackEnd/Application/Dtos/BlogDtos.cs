

using Microsoft.AspNetCore.Http;

namespace Application.Dtos
{
    public class BlogDto
    {
        public int? Id { get; set; }
        public string TitleFa { get; set; } = string.Empty;
        public string IntroFa { get; set; } = string.Empty;
        public string ContentFa { get; set; } = string.Empty;
        public string ConclusionFa { get; set; } = string.Empty;
        public string? ExcerptFa { get; set; }
        public string? MetaDescriptionFa { get; set; }
        public string? MetaKeywordsFa { get; set; }

        public string TitleEn { get; set; } = string.Empty;
        public string IntroEn { get; set; } = string.Empty;
        public string ContentEn { get; set; } = string.Empty;
        public string ConclusionEn { get; set; } = string.Empty;

        public string? ExcerptEn { get; set; }
        public string? MetaDescriptionEn { get; set; }
        public string? MetaKeywordsEn { get; set; }

        public string? Slug { get; set; }
        public string? ThumbnailFile { get; set; }
        public int? AuthorId { get; set; }
        public bool? IsActive { get;  set; }  
        public string? AuthorName { get; set; }
        public DateTime? CreatedAt { get;  set; }
        public DateTime? UpdatedAt { get;  set; }
        public IEnumerable<TagDto>? BlogTags { get; set; } = Enumerable.Empty<TagDto>();


    }



    public class BlogRateSummaryDto
    {
        public int BlogId { get; set; }

        public double AverageRate { get; set; }
        public int RatesCount { get; set; }

        public int? UserRate { get; set; }  
    }
}
