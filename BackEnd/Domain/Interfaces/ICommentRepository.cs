using Domain.Enums;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

namespace Domain.Interfaces
{
    public interface ICommentRepository : IRepository<Comment>
    {
 

        // کامنت‌های کاربر
        Task<List<Comment>> GetByUserAsync(
            int userId
        );

        // کامنت‌های پاسخ (Reply)
        Task<List<Comment>> GetRepliesAsync(
            int parentId,
            bool onlyApproved = true
        );

        // گرفتن یک کامنت مشخص (برای Edit / Approve)
        Task<Comment?> GetByIdAsync(
            int commentId
        );
    }
}
