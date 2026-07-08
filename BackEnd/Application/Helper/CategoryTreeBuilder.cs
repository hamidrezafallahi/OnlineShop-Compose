using Application.Dtos;

public static class CategoryTreeBuilder
{
    public static List<CategoryDto> BuildTree(List<CategoryDto> allCategories, int? parentId = null)
    {
        return allCategories
.Where(c => parentId == null ? c.ParentCategoryId == null : c.ParentCategoryId == parentId)
            .Select(c => new CategoryDto
            {
                Id = c.Id,
                IsActive=c.IsActive,
                CategoryCover = c.CategoryCover,
                EnglishName=c.EnglishName,
                IsShowInLanding = c.IsShowInLanding,
                PersianName=c.PersianName,
                CategoryEnglishDesc=c.CategoryEnglishDesc,
                CategoryPersianDesc=c.CategoryPersianDesc,
                ParentCategoryId = c.ParentCategoryId,
                SubCategories = BuildTree(allCategories, c.Id)
            })
            .ToList();
    }
}
