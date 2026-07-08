using Common;
using MediatR;
using Application.Dtos;

namespace Application.Queries
{
    public class GetAllPaymentsQuery : BaseListDto, IRequest<ServiceResult<ListDto<PaymentDto>>>
    {
        public bool? ByConfig { get; set; } = false;
        public string? Q { get; set; }
        public bool? OnlyActives { get; set; } = true;
    }
   
    public class GetPaymentByIdQuery : IRequest<ServiceResult<PaymentDto?>>
    {
        public int Id { get; set; }
    }

    public class GetPaymentsByOrderIdQuery : IRequest<ServiceResult<IEnumerable<PaymentDto>>>
    {
        public int OrderId { get; set; }
        
    }
}
