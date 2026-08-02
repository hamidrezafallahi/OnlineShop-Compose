using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace OnlineShop.Domain.Common
{
    public static class SlugHelper
    {
        public static string Generate(string source, int? uniqueSuffix = null)
        {
            if (string.IsNullOrWhiteSpace(source))
                source = "product";

            var normalized = source.Trim().ToLowerInvariant().Normalize(NormalizationForm.FormD);
            var sb = new StringBuilder(normalized.Length);

            foreach (var ch in normalized)
            {
                var category = CharUnicodeInfo.GetUnicodeCategory(ch);
                if (category == UnicodeCategory.NonSpacingMark)
                    continue;

                if (char.IsLetterOrDigit(ch))
                {
                    sb.Append(ch);
                    continue;
                }

                if (ch is ' ' or '_' or '-' or '/' or '\\')
                    sb.Append('-');
            }

            var slug = Regex.Replace(sb.ToString(), "-{2,}", "-").Trim('-');
            if (string.IsNullOrWhiteSpace(slug))
                slug = "product";

            if (uniqueSuffix.HasValue)
                slug = $"{slug}-{uniqueSuffix.Value}";

            return slug.Length > 180 ? slug[..180].Trim('-') : slug;
        }
    }
}
