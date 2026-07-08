namespace Application.Dtos
{
    public class ProductOfferDiscountDto
    {
        public int Id { get; set; }
        public int ProductOfferId { get; set; }
        public int ProductId { get; set; }
        public int DiscountId { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime DiscountStartDate { get; set; }
        public DateTime DiscountEndDate { get; set; }
        public string? ProductName { get; set; }
        public string? ProductImage { get; set; }

        public string Supplier { get; set; }
        public string? DiscountTitle { get; set; }
        public decimal? DiscountAmount { get; set; }
        public bool? DiscountIsPercent { get; set; }
        public bool IsActive { get; set; }

    }
}