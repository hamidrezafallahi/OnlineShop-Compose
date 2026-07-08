using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

public interface ICartItemRepository : IRepository<CartItem>
{
    Task<IEnumerable<CartItem>> GetItemsByCartIdAsync(int cartId);

    Task<CartItem?> GetItemByOfferAndCartAsync(
        int cartId,
        int productOfferId);

    Task<bool> ExistsAsync(
        int cartId,
        int productOfferId);

    Task<bool> RemoveAllByCartIdAsync(int cartId, int currentUserId);

    Task<decimal> GetTotalAmountByCartIdAsync(int cartId);

    Task<CartReadModel?> GetUserCartSummaryAsync(int userId);
}
