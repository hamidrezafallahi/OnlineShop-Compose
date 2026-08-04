namespace Application.Dtos
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = default!;
        public string Slug { get; set; } = default!;
        public string logoFile { get; set; } = default!;
        public string Description { get; set; } = default!;
        public string? SeoTitleFa { get; set; }
        public string? SeoTitleEn { get; set; }
        public string? MetaDescriptionFa { get; set; }
        public string? MetaDescriptionEn { get; set; }
        public bool IsActive { get; set; }

    }
   
}
