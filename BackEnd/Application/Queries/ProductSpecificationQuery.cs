using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetProductSpecificationsQuery : BaseListDto, IRequest<ServiceResult<ListDto<SpecificationsDto>>>
    {}
    public class GetProductSpecificationByIdQuery : IRequest<ServiceResult<SpecificationsDto?>>
    {
        public int Id { get; set; }
    }
 
}
