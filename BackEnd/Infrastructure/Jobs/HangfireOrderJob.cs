using OnlineShop.Application.Interfaces;
public class HangfireOrderJob
{
    private readonly IOrderJobService _orderJobService;

    public HangfireOrderJob(IOrderJobService orderJobService)
    {
        _orderJobService = orderJobService;
    }

    public Task DeleteOrderAfter15Min(int orderId, int userId)
    {
        return _orderJobService.DeleteOrderAfter15Min(orderId, userId);
    }
}
