using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
    public class GetDiscountCodeByCodeQuery : IRequest<ServiceResult<DiscountCodeDto?>>
    {
        public string Code { get; set; }
    }
    public class GetDiscountCodeByIdQuery : IRequest<ServiceResult<DiscountCodeDto?>>
    {
        public int Id { get; set; }
    }
    public class GetAllDiscountCodesQuery : BaseListDto, IRequest<ServiceResult<ListDto<DiscountCodeDto>>>
    {}


}
