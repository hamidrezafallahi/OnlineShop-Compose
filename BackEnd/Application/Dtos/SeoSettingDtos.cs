namespace Application.Dtos
{
    public class SeoSettingDto
    {
        public int Id { get; set; }
        public string RoutePath { get; set; } = string.Empty;
        public string MatchType { get; set; } = "exact";
        public string? TitleFa { get; set; }
        public string? TitleEn { get; set; }
        public string? DescriptionFa { get; set; }
        public string? DescriptionEn { get; set; }
        public string? KeywordsFa { get; set; }
        public string? KeywordsEn { get; set; }
        public string? CanonicalPath { get; set; }
        public string? OgImageUrl { get; set; }
        public bool RobotsIndex { get; set; }
        public bool RobotsFollow { get; set; }
        public int Priority { get; set; }
        public string? Notes { get; set; }
        public bool IsActive { get; set; }
    }

    public class SeoResolvedDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Keywords { get; set; }
        public string? CanonicalPath { get; set; }
        public string? OgImageUrl { get; set; }
        public bool RobotsIndex { get; set; }
        public bool RobotsFollow { get; set; }
        public string MatchType { get; set; } = "exact";
        public string RoutePath { get; set; } = string.Empty;
    }
}
