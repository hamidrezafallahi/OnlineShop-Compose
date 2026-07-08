using OnlineShop.Domain.Interfaces;
using OnlineShop.Application.Interfaces;
namespace OnlineShop.Infrastructure.Jobs
{
    public class OrderJobService : IOrderJobService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IOrderItemRepository _orderItemRepository;


        public OrderJobService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task DeleteOrderAfter15Min(int orderId, int userId)
        {
            await _orderRepository.DeleteOrderByUserIdAsJobAsync(orderId,userId);
         }
    }
}
