namespace Application.Dtos;

public class BlogContentQualityRequestDto
{
    public string TitleFa { get; set; } = string.Empty;
    public string IntroFa { get; set; } = string.Empty;
    public string ContentFa { get; set; } = string.Empty;
    public string ConclusionFa { get; set; } = string.Empty;
    public string? ExcerptFa { get; set; }
    public string? MetaDescriptionFa { get; set; }
    public string? MetaKeywordsFa { get; set; }
    public string? TitleEn { get; set; }
    public string? IntroEn { get; set; }
    public string? ContentEn { get; set; }
    public string? ConclusionEn { get; set; }
    public string? ExcerptEn { get; set; }
    public string? MetaDescriptionEn { get; set; }
    public string? MetaKeywordsEn { get; set; }
    public string? Slug { get; set; }
    public string? PrimaryKeyword { get; set; }
    public int? ExcludeBlogId { get; set; }
}

public class BlogContentQualityResultDto
{
    public bool IsValid { get; set; }
    public List<string> Errors { get; set; } = [];
    public List<string> Warnings { get; set; } = [];
    public Dictionary<string, object> Metrics { get; set; } = new();
}
