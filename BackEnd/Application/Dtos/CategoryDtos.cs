namespace Application.Dtos
{
    public class CategoryDto
    {
        public int Id { get; set; }
        public string PersianName { get; set; } = string.Empty;
        public string EnglishName { get; set; } = string.Empty;
        public string CategoryCover { get; set; } = string.Empty;
        public string CategoryPersianDesc { get; set; }
        public string CategoryEnglishDesc { get; set; }
        public bool IsShowInLanding { get; set; } = false;
        public bool IsActive { get; set; }

        public int? ParentCategoryId { get; set; }
        public List<CategoryDto>? SubCategories { get; set; }

    }
    

}
