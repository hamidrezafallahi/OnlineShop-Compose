using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllPaymentMethodsQuery :BaseListDto, IRequest<ServiceResult<ListDto<PaymentMethodDto>>> 
    {

    }
    public class GetPaymentMethods4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>> { }
    public class GetPaymentMethodByIdQuery : IRequest<ServiceResult<PaymentMethodDto>>
    {
        public int Id { get; set; }
    }
}
