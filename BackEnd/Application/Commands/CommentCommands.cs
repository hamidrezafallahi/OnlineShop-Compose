using Common;
using Domain.Enums;
using MediatR;

namespace Application.Commands
{
    // ===== 1. ایجاد کامنت جدید =====
    public class CreateCommentCommand : IRequest<ServiceResult<IdDto>>
    {
        public int TargetId { get; set; }
        public EnumTargetType TargetType { get; set; }
        public string Content { get; set; } = null!;
        public int? ParentId { get; set; } // برای پاسخ به کامنت دیگر
    }

    // ===== 2. پاسخ به یک کامنت (اختیاری، می‌توان همان CreateCommentCommand استفاده شود) =====
    public class ReplyCommentCommand : IRequest<ServiceResult<IdDto>>
    {
        public int ParentId { get; set; }
        public int TargetId { get; set; }
        public EnumTargetType TargetType { get; set; }
        public string Content { get; set; } = null!;
    }

    // ===== 3. تایید کامنت توسط ادمین =====
    public class ApproveCommentCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public bool IsApprove { get; set; }
    }
    public class ActiveCommentCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    // ===== 4. ویرایش کامنت توسط کاربر =====
    public class EditCommentCommand : IRequest<ServiceResult<IdDto>>
    {
        public int CommentId { get; set; }
        public int UserId { get; set; }  
        public string Content { get; set; } = null!;
    }

    // ===== 5. حذف نرم کامنت =====
    public class DeleteCommentCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
