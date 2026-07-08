using OnlineShop.Domain.Enums;

namespace Application.Dtos
{
    public class OrderDto

    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalPrice { get; set; }
        public OrderStatus Status { get; set; }

        // آیتم‌های سفارش رو هم می‌تونیم به صورت لیست DTO های جداگانه نگه داریم:
        public List<OrderItemDto> Items { get; set; } = new List<OrderItemDto>();
    }

    public class OrderItemDto

    {
        public int OrderId { get;  set; }

        public int ProductOfferId { get;  set; }
        public ProductReadModel Product { get;  set; } 

        public int Quantity { get;  set; }
        public decimal UnitPrice { get;  set; }
    }
    public class DisplayOrderItemDto
    {
        public int Id { get; set; }
        public string ProductOfferUser { get; set; }
        public string User { get; set; }
        public string ProductName { get; set; }
        public string ProductImage { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public string OrderStatus { get; set; }
        public bool IsActive { get; set; }


}
public class TotalPriceDto
    {
        public decimal TotalPrice { get; set; }
    }
    public class OrderIdDto
    {
        public int OrderId { get; set; }
    }


}
