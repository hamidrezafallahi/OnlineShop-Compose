using Application.Dtos;
using Common;
using MediatR;


public class GetOrderItemsQuery : BaseListDto, IRequest<ServiceResult<ListDto<DisplayOrderItemDto>>> { }

public class GetOpenOrdersQuery : IRequest<ServiceResult<IEnumerable<OrderDto>>>
{
}
public class GetOrdersByUserIdQuery : IRequest<ServiceResult<IEnumerable<OrderReadModel>>>
{
}

public class GetOrderWithItemsQuery : IRequest<ServiceResult<OrderReadModel?>>
{
    public int OrderId { get; set; }

    public GetOrderWithItemsQuery(int orderId)
    {
        OrderId = orderId;
    }
}

public class CalculateTotalPriceQuery : IRequest<ServiceResult<TotalPriceDto>>
{
    public int OrderId { get; set; }

  
}

public class GetItemsByOrderIdQuery : IRequest<ServiceResult<IEnumerable<OrderItemReadModel>>>
{
    public int OrderId { get; set; }

   
}
public class GetOrderItemByIdQuery : IRequest<ServiceResult<OrderItemReadModel>>
{
    public int Id { get; set; }


}