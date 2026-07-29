namespace OnlineShop.Domain.Entities
{
    public class SeoSetting : BaseEntity
    {
        private SeoSetting() { }

        public string RoutePath { get; private set; } = string.Empty;
        public string MatchType { get; private set; } = "exact";
        public string? TitleFa { get; private set; }
        public string? TitleEn { get; private set; }
        public string? DescriptionFa { get; private set; }
        public string? DescriptionEn { get; private set; }
        public string? KeywordsFa { get; private set; }
        public string? KeywordsEn { get; private set; }
        public string? CanonicalPath { get; private set; }
        public string? OgImageUrl { get; private set; }
        public bool RobotsIndex { get; private set; } = true;
        public bool RobotsFollow { get; private set; } = true;
        public int Priority { get; private set; } = 0;
        public string? Notes { get; private set; }

        public static SeoSetting Create(
            string routePath,
            string matchType,
            string? titleFa,
            string? titleEn,
            string? descriptionFa,
            string? descriptionEn,
            string? keywordsFa,
            string? keywordsEn,
            string? canonicalPath,
            string? ogImageUrl,
            bool robotsIndex,
            bool robotsFollow,
            int priority,
            string? notes,
            int currentUserId)
        {
            var entity = new SeoSetting
            {
                RoutePath = NormalizePath(routePath),
                MatchType = NormalizeMatchType(matchType),
                TitleFa = NullIfWhiteSpace(titleFa),
                TitleEn = NullIfWhiteSpace(titleEn),
                DescriptionFa = NullIfWhiteSpace(descriptionFa),
                DescriptionEn = NullIfWhiteSpace(descriptionEn),
                KeywordsFa = NullIfWhiteSpace(keywordsFa),
                KeywordsEn = NullIfWhiteSpace(keywordsEn),
                CanonicalPath = NormalizeOptionalPath(canonicalPath),
                OgImageUrl = NullIfWhiteSpace(ogImageUrl),
                RobotsIndex = robotsIndex,
                RobotsFollow = robotsFollow,
                Priority = priority,
                Notes = NullIfWhiteSpace(notes),
            };

            entity.MarkCreated(currentUserId);
            return entity;
        }

        public void Update(
            int currentUserId,
            string? routePath = null,
            string? matchType = null,
            string? titleFa = null,
            string? titleEn = null,
            string? descriptionFa = null,
            string? descriptionEn = null,
            string? keywordsFa = null,
            string? keywordsEn = null,
            string? canonicalPath = null,
            string? ogImageUrl = null,
            bool? robotsIndex = null,
            bool? robotsFollow = null,
            int? priority = null,
            string? notes = null)
        {
            if (routePath != null)
            {
                RoutePath = NormalizePath(routePath);
            }

            if (matchType != null)
            {
                MatchType = NormalizeMatchType(matchType);
            }

            if (titleFa != null) TitleFa = NullIfWhiteSpace(titleFa);
            if (titleEn != null) TitleEn = NullIfWhiteSpace(titleEn);
            if (descriptionFa != null) DescriptionFa = NullIfWhiteSpace(descriptionFa);
            if (descriptionEn != null) DescriptionEn = NullIfWhiteSpace(descriptionEn);
            if (keywordsFa != null) KeywordsFa = NullIfWhiteSpace(keywordsFa);
            if (keywordsEn != null) KeywordsEn = NullIfWhiteSpace(keywordsEn);
            if (canonicalPath != null) CanonicalPath = NormalizeOptionalPath(canonicalPath);
            if (ogImageUrl != null) OgImageUrl = NullIfWhiteSpace(ogImageUrl);
            if (robotsIndex.HasValue) RobotsIndex = robotsIndex.Value;
            if (robotsFollow.HasValue) RobotsFollow = robotsFollow.Value;
            if (priority.HasValue) Priority = priority.Value;
            if (notes != null) Notes = NullIfWhiteSpace(notes);

            MarkUpdated(currentUserId);
        }

        private static string NormalizePath(string? routePath)
        {
            var normalized = (routePath ?? string.Empty).Trim().Trim('/');
            return normalized;
        }

        private static string? NormalizeOptionalPath(string? path)
        {
            if (string.IsNullOrWhiteSpace(path))
            {
                return null;
            }

            if (path.StartsWith("http://") || path.StartsWith("https://"))
            {
                return path.Trim();
            }

            return NormalizePath(path);
        }

        private static string NormalizeMatchType(string? matchType)
        {
            var normalized = (matchType ?? "exact").Trim().ToLowerInvariant();
            return normalized is "prefix" ? "prefix" : "exact";
        }

        private static string? NullIfWhiteSpace(string? value)
        {
            return string.IsNullOrWhiteSpace(value) ? null : value.Trim();
        }
    }
}
