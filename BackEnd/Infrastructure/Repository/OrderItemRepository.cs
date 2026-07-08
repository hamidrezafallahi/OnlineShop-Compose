using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class OrderItemRepository : Repository<OrderItem>, IOrderItemRepository
    {
        public OrderItemRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<OrderItemReadModel>> GetItemsByOrderIdAsync(int orderId)
        {
            var orderItems = await Query(oi => oi.OrderId == orderId)
                .Include(oi => oi.ProductOffer)
                    .ThenInclude(po => po.Product)
                .ToListAsync();

            return orderItems.Select(oi => new OrderItemReadModel
            {
                Id=oi.Id,
                ProductOfferId = oi.ProductOfferId,
                Quantity = oi.Quantity,
                UnitPrice = oi.UnitPrice,
                Product = new ProductReadModel
                {
                    Name = oi.ProductOffer.Product.Name,
                    Description = oi.ProductOffer.Product.Description
                }
            });
        }

        public async Task<decimal> CalculateTotalPriceAsync(int orderId)
        {
            return await Query(oi => oi.OrderId == orderId)
                .SumAsync(oi => oi.TotalPrice);
        }
 
    }
}
