using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        Task<List<Payment>> GetByOrderIdAsync(int orderId);
        Task<Payment?> GetByTransactionIdAsync(string transactionId);
    }
}
