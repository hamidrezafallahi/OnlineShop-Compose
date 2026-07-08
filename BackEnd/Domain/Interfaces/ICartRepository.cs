using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces;

public interface ICartRepository : IRepository<Cart>
{
    Task<Cart?> GetUserCartAsync(int userId);
    Task<DetailCartReadModel?> GetDetailCartAsync(int userId, int cartId);
    Task<Cart?> GetByIdWithItemsAsync(int id);
    Task<Cart?> GetByUserIdWithItemsAsync(int userId);
    Task<int> ClearCartAsync(int currentUserId);
}
