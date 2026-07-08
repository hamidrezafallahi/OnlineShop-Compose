using System.Collections.Generic;
using System.Linq;

namespace OnlineShop.Application.Common.Helpers
{
    public static class GridifyFilterHelper
    {
        /// <summary>
        /// ساخت فیلتر اکسپرشن برای Gridify
        /// </summary>
        public static string BuildFilterExpression<T>(
            T request, 
            bool? onlyActives, 
            string? searchTerm,
            params string[] searchFields)
        {
            var filters = new List<string>();
            
            // فیلتر فعال بودن
            if (onlyActives == true)
            {
                filters.Add("isActive=true");
            }
            
            // فیلتر جستجو
            if (!string.IsNullOrEmpty(searchTerm))
            {
                var searchFilter = BuildSearchFilter(searchTerm, searchFields);
                filters.Add(searchFilter);
            }
            
            return filters.Any() ? string.Join(",", filters) : string.Empty;
        }
        
        private static string BuildSearchFilter(string searchTerm, params string[] fields)
        {
            if (fields == null || fields.Length == 0)
                return string.Empty;
                
            var fieldFilters = fields.Select(field => $"{field}*={searchTerm}");
            return $"({string.Join("|", fieldFilters)})";
        }
        
        /// <summary>
        /// برای Blog های خاص
        /// </summary>
        public static string BuildBlogFilter(bool? onlyActives, string? searchTerm)
        {
            var filters = new List<string>();
            
            if (onlyActives == true)
                filters.Add("isActive=true");
                
            if (!string.IsNullOrEmpty(searchTerm))
                filters.Add($"({BuildBlogSearchFields(searchTerm)})");
                
            return filters.Any() ? string.Join(",", filters) : string.Empty;
        }
        
        private static string BuildBlogSearchFields(string searchTerm)
        {
            return $"(titleFa*={searchTerm}|titleEn*={searchTerm}|contentFa*={searchTerm}|contentEn*={searchTerm}|slug*={searchTerm})";
        }
    }
}


