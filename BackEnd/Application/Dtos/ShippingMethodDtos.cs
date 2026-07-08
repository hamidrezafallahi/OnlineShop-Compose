namespace Application.Dtos
{
    public class ShippingMethodDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDeliveryTime { get; set; }
        public bool IsDefault { get; set; }
    }
}

