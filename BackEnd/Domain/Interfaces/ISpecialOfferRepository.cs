using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface ISpecialOfferRepository : IRepository<SpecialOffer>
    {
        // دریافت پیشنهادهای ویژه فعال در حال حاضر
        Task<IEnumerable<SpecialOffer>> GetActiveOffersAsync();

        // دریافت پیشنهادهای ویژه مربوط به محصول خاص
        Task<IEnumerable<SpecialOffer>> GetOffersByProductIdAsync(int productId);

        // دریافت پیشنهادهای ویژه امروز (برای صفحه‌ی لندینگ)
        Task<IEnumerable<SpecialOffer>> GetTodayOffersAsync();

        // دریافت همه پیشنهادها با محصول و تخفیف
        Task<IEnumerable<SpecialOffer>> GetAllWithIncludesAsync();

        // بررسی اینکه آیا محصول در حال حاضر پیشنهاد فعال دارد
        Task<bool> HasActiveOfferAsync(int productId);
    }
}
