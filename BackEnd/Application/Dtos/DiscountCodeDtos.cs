using Application.Dtos;

public class DiscountCodeDto
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
    public string Code { get; set; } = default!;
    public decimal Amount { get; set; }
    public bool IsPercent { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int? UsageLimit { get; set; }
    public int UsedCount { get; set; }
    public int? UserId { get; set; }
    public bool IsValid { get; set; }
}
