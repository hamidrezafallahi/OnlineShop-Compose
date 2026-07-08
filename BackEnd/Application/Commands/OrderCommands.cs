
using Application.Dtos;
using Common;
using Domain.Enums;
using MediatR;
using OnlineShop.Domain.Entities;
using System.Text.Json.Serialization;
// ساخت سفارش
public class CheckoutCartCommand : IRequest<ServiceResult<OrderIdDto>>
{
    public int ShippingAddressId { get; set; }
    public int ShippingMethodId { get; set; }
    public int PaymentMethodId { get; set; }
    public decimal? ShippingCost { get; set; } = 0;
    public decimal? DiscountAmount { get; set; } = 0;
    public string? DiscountCode { get; set; } 

}

// تایید سفارش
public class ConfirmOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
}
// پرداخت سفارش
public class PayOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
}
public class ActiveOrderCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
// حذف سفارش
public class DeleteOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
}

// افزودن آیتم
public class AddOrderItemCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
    public int ProductOfferId { get; set; }
    public string ProductName { get; set; } = default!;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }
}

public class ActiveOrderItemCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
   
}
public class RemoveOrderItemCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }

}
public class DeleteOrderItemCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }

}
 




// ارسال سفارش
public class ShipOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
}

// تحویل سفارش
public class DeliverOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
}

// لغو سفارش
public class CancelOrderCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
}

// به‌روزرسانی آیتم سفارش
public class UpdateOrderItemCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }   // آیتم سفارش
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = default!;
    public decimal UnitPrice { get; set; }
    public int Quantity { get; set; }

}
public class ApplyDiscountCodeCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
    public int DiscountCodeId { get; set; }
    public int CurrentUserId { get; set; } // کسی که اعمال میکنه
}

public class RemoveDiscountCodeCommand : IRequest<ServiceResult<IdDto>>
{
    public int OrderId { get; set; }
    public int CurrentUserId { get; set; }
}
