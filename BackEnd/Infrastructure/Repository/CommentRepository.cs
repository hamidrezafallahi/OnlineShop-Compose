using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class CommentRepository : Repository<Comment>, ICommentRepository
    {
        public CommentRepository(AppDbContext context)
            : base(context)
        {
        }
 
        public async Task<List<Comment>> GetByUserAsync(int userId)
        {
            return await Query(c =>
                    c.UserId == userId &&
                    !c.IsDeleted
                )
                .OrderByDescending(c => c.CreatedAt)
                .ToListAsync();
        }

        // ================================
        // پاسخ‌های یک کامنت
        // ================================
        public async Task<List<Comment>> GetRepliesAsync(
            int parentId,
            bool onlyApproved = true)
        {
            var query = Query(c =>
                c.ParentId == parentId &&
                !c.IsDeleted
            );

            if (onlyApproved)
            {
                query = query.Where(c => c.IsApproved);
            }

            return await query
                .OrderBy(c => c.CreatedAt)
                .ToListAsync();
        }

        // ================================
        // گرفتن یک کامنت خاص
        // ================================
        public async Task<Comment?> GetByIdAsync(int commentId)
        {
            return await Query(c =>
                    c.Id == commentId &&
                    !c.IsDeleted
                )
                .FirstOrDefaultAsync();
        }
    }
}
