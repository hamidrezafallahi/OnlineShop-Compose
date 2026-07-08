using OnlineShop.Domain.Entities;
using System.Text.Json.Serialization;

namespace Application.Dtos
{
    public class GetCartByIdRequestDto
    {
        public int Id { get; set; }
    }

    public class CartDto

    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public bool IsActive { get; set; }
        public CartStatus Status { get;  set; } 

        public int ItemsCount { get; set; }
        public decimal TotalPrice { get; set; }

        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
    }
    public class detailCartDto

    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<DetailCartItemDto> Items { get; set; } = new List<DetailCartItemDto>();
    }
    public class DetailCartItemDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; } = "";
        public decimal Price { get; set; }
        public string? Description { get; set; }
        public int Quantity { get; set; }
        public List<ItemDiscountDto> Discounts { get; set; } = new();
    }

    public class ItemDiscountDto
    {
        public bool IsPercent { get; set; }
        public decimal Amount { get; set; }
        public decimal AmountAfterCalc { get; set; }
    }




}
