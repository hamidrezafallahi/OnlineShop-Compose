

namespace OnlineShop.Domain.Interfaces
{
    public interface IOrderItemRepository : IRepository<OrderItem>
    {
        // گرفتن همه آیتم‌های یک سفارش خاص
        Task<IEnumerable<OrderItemReadModel>> GetItemsByOrderIdAsync(int orderId);

        // محاسبه مجموع قیمت آیتم‌های یک سفارش
        Task<decimal> CalculateTotalPriceAsync(int orderId);
 
    }
}
