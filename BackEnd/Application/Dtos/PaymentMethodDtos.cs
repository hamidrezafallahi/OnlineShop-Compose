namespace Application.Dtos
{
    public class PaymentMethodDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsOnline { get; set; }
        public bool IsActive { get; set; }
        public int DisplayOrder { get; set; }
        public string? ConfigJson { get; set; }
    }
}
