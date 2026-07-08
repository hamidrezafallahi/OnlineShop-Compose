using Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateDiscountCodeCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Code { get; set; } = default!;
        public decimal Amount { get; set; }
        public bool IsPercent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UsageLimit { get; set; }
        public int? UserId { get; set; } // اگر کد برای کاربر خاص باشد


    }

    public class UpdateDiscountCodeCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string Code { get; set; } = default!;
        public decimal Amount { get; set; }
        public bool IsPercent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UsageLimit { get; set; }
        public int? UserId { get; set; } 
        public int CurrentUserId { get; set; }
    }
    public class ActiveDiscountCodeCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteDiscountCodeCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
  
}

