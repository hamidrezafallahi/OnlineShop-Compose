using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IProductImageRepository : IRepository<ProductImage>
    {
        // دریافت همه تصاویر مربوط به یک محصول خاص
        Task<IEnumerable<ProductImage>> GetImagesByProductIdAsync(int productId);

        // دریافت تصویر اصلی یک محصول
        Task<ProductImage?> GetMainImageByProductIdAsync(int productId);

        // حذف همه تصاویر یک محصول (مثلاً هنگام حذف محصول)
        Task<bool> DeleteImagesByProductIdAsync(int productId);
    }
}
