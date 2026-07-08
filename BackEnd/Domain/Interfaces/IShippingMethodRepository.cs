using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IShippingMethodRepository : IRepository<ShippingMethod>
    {
        Task<IEnumerable<ShippingMethod>> GetActiveMethodsAsync();
    }
}
