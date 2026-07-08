
namespace Application.Dtos
{
    public class BlogTagDto
    {
        public int? Id { get; set; }
        public bool? IsActive { get; set; }
        public int BlogId { get; set; }
        public int TagId { get; set; }
        public string? TagName { get; set; } = string.Empty;
        public string? BlogTitleFa { get; set; } = string.Empty;
        public string? BlogTitleEn { get; set; } = string.Empty;

    }


}
