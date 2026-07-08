namespace Application.Dtos
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }

        public int CartId { get; set; }
        public decimal BasePrice { get; set; }
        public decimal FinalPrice { get; set; }

        public string ProductName { get; set; }
        public string ProductImage { get; set; }

        public string UserName { get; set; }

        public int ProductId { get; set; }

        public int ProductOfferId { get; set; }
        public int Quantity { get; set; }
         
    }
    public class CartItemSyncDto
    {
        public int ProductId { get; set; }

        public int ProductOfferId { get; set; }
        public int Quantity { get; set; }
    }
}
