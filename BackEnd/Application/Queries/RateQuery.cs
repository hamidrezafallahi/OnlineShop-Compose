using Application.Dtos;
using Common;
using Domain.Enums;
using MediatR;
 

namespace Application.Queries
{
    public class GetAllRateQuery :BaseListDto, IRequest<ServiceResult<ListDto<RateDto>>>{}
    public class GetRateByIdQuery : IRequest<ServiceResult<GetRateByIdDto>>
    {
        public int Id { get; set; }
     
    }
    public class GetAverageRateQuery : IRequest<ServiceResult<AverageRateDto>>
    {
        public EnumTargetType TargetType { get; set; }  
        public int TargetId { get; set; }
    }

}
