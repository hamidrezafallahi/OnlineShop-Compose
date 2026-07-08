
namespace Application.Dtos
{
    public class UserTagDto
    {
        public int? Id { get; set; }
        public bool? IsActive { get; set; }
        public int UserId { get; set; }
        public int TagId { get; set; }
        public string? TagName { get; set; } = string.Empty;
        public string? UserName { get; set; } = string.Empty;

    }


}
