namespace Application.Dtos
{
    public class DiscountDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = default!;
        public decimal Amount { get; set; }
        public bool IsPercent { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public List<int>? ProductIds { get; set; }
    }
    public class ValidDiscountDto
    {
        public bool Valid { get; set; }
    }
}
