using Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateDiscountCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Title { get; set; } = default!;
        public decimal Amount { get; set; }
        public bool IsPercent { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsActive { get; set; }
        public int? Priority { get; set; }

    };
    public class UpdateDiscountCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; } 
        public string? Title { get; set; }
        public decimal Amount { get; set; }
        public bool IsPercent { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsActive { get; set; }
        public int? Priority { get; set; }

    }
    public class ActiveDiscountCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteDiscountCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    } ;

}

