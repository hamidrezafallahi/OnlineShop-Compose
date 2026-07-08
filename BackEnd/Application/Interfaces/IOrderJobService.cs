namespace OnlineShop.Application.Interfaces
{
    public interface IOrderJobService
    {
        Task DeleteOrderAfter15Min(int orderId, int userId);
    }
}
