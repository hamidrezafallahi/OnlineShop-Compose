using Domain.Enums;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Enums;
using OnlineShop.Domain.Interfaces;

public interface IOrderRepository : IRepository<Order>
{
    Task<IEnumerable<OrderReadModel>> GetOrdersByUserIdAsync(int userId);
    Task<OrderReadModel?> GetOrderWithItemsReadModelAsync(int orderId);
    Task<Order?> GetOrderWithItemsAsync(int orderId);
    Task<UserAddress?> GetUserAddressByIdAsync(int addressId);

    Task<OrderReadModel?> AddItemToOrderAsync(int orderId, int productOfferId, int quantity, int currentUserId);
     Task<bool> DeleteOrderByUserIdAsJobAsync(int orderId, int userId);
    // ===================== Create Order =====================
    Task<int> CreateOrderFromCartAsync(
        int currentUserId,
        int shippingAddressId,
        int shippingMethodId,
        int paymentMethodId,
        decimal shippingCost,
        decimal discountAmount,
        int? discountCodeId
    );

    // ===================== Update Order =====================
    Task<bool> UpdateOrderDetailsAsync(
        int orderId,
        int? shippingAddressId,
        int? shippingMethodId,
        int? paymentMethodId,
        decimal? shippingCost,
        decimal? discountAmount,
        string? trackingCode,
        int currentUserId
    );
    Task<bool> ApplyDiscountCodeAsync(int orderId, int discountCodeId, int currentUserId);
    Task<bool> RemoveDiscountCodeAsync(int orderId, int currentUserId);
    Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status, int currentUserId);
    Task<bool> MarkOrderAsPaidAsync(int orderId, int currentUserId);
    Task<bool> SetTrackingCodeAsync(int orderId, string trackingCode, int currentUserId);
}