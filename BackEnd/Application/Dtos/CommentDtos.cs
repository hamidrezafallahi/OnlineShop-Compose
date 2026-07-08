using Domain.Enums;

namespace Application.Dtos
{
    public class CommentDto
    {
        public int Id { get; set; }

        // ===== Target (جایگزین BlogId) =====
        public int TargetId { get; set; }
        public string TargetType { get; set; }
 
        // ===== User =====
        public int UserId { get; set; }
        public string? UserFullName { get; set; }
        public string? UserImage { get; set; }
        public int UserRate { get; set; }
        public string UserName { get;  set; } 
        public string TargetTitle { get;  set; } 
        public string? ParentName { get;  set; } = string.Empty;

        // ===== Content =====
        public string Content { get; set; } = string.Empty;
        public bool IsActive { get; set; }

        public bool IsApproved { get; set; }
        public DateTime CreatedAt { get; set; }

        // ===== Reply =====
        public int? ParentId { get; set; }
        public List<CommentDto>? Replies { get; set; }
    }
    public class CommentListDto
    {
        public IEnumerable<CommentDto> Records { get; set; } = new List<CommentDto>();

        public string? ColumnsJson { get; set; }
        public string? ActionsJson { get; set; }

        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
