using Application.Dtos;
using Common;
using MediatR;


namespace Application.Queries
{
    public class GetAllShippingMethodsQuery : BaseListDto, IRequest<ServiceResult<ListDto<ShippingMethodDto>>> {
    }
    public class GetShippingMethodByIdQuery : IRequest<ServiceResult<ShippingMethodDto>>
    {
        public int Id { get; set; }

    }
}
