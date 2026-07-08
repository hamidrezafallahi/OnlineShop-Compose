using Domain.Enums;
using OnlineShop.Domain.Enums;
namespace Application.Common
{
    public static class OrderStatusExtensions
    {
        public static string OrderStatusToDisplay(this OrderStatus status)
        {
            return status switch
            {
                OrderStatus.Pending => "ثبت اولیه",
                OrderStatus.Confirmed => "تایید شده",
                OrderStatus.Paid => "پرداخت شده",
                OrderStatus.Shipped => "ارسال شده",
                OrderStatus.Delivered => "تحویل داده شده",
                OrderStatus.Cancelled => "لغو شده",
                _ => status.ToString()
            };
        }
    }
    public static class CommentTargetTypeExtensions
    {
        public static string TargetTypeToDisplay(this EnumTargetType status)
        {
            return status switch
            {
                EnumTargetType.Product => "محصول",
                EnumTargetType.Blog => "مقاله",
                EnumTargetType.Supplier => "تامین کننده",
                _ => status.ToString()
            };
        }
    }
}
