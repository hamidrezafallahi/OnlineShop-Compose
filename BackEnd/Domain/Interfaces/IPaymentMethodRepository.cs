using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IPaymentMethodRepository : IRepository<PaymentMethod>
    {
        Task<List<PaymentMethod>> GetActiveMethodsAsync();

    }
}
