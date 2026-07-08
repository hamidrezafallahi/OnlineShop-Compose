using Domain.Enums;

namespace Application.Dtos
{
    public class RateDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string UserName { get; set; }
        public int RateValue { get; set; }
        public int TargetId { get; set; }
        public string TargetType { get; set; }
    }
    public class GetRateByIdDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Value { get; set; }
        public int TargetId { get; set; }
        public EnumTargetType TargetType { get; set; }
    }
    public class AverageRateDto
    {
        public double Average { get; set; }
        public int Count { get; set; } 
    }
     

}
