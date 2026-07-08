using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class ProductImageRepository : Repository<ProductImage>, IProductImageRepository
    {
        public ProductImageRepository(AppDbContext context) : base(context)
        {
        }

        // حذف همه تصاویر مربوط به یک محصول
        public async Task<bool> DeleteImagesByProductIdAsync(int productId)
        {
            var images = await Query(pi => pi.ProductId == productId).ToListAsync();
            if (!images.Any())
                return false;

            _dbSet.RemoveRange(images);
            await _context.SaveChangesAsync(); 

            return true;
        }


        // دریافت تصاویر مربوط به یک محصول
        public async Task<IEnumerable<ProductImage>> GetImagesByProductIdAsync(int productId)
        {
            return await Query(pi => pi.ProductId == productId)
                .ToListAsync();
        }

        // دریافت تصویر اصلی یک محصول
        public async Task<ProductImage?> GetMainImageByProductIdAsync(int productId)
        {
            return await Query(pi => pi.ProductId == productId && pi.IsMain)
                 .FirstOrDefaultAsync();
        }

       
    }
}
