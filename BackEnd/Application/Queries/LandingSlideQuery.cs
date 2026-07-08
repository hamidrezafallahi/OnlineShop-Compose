using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllLandingSlidesQuery : BaseListDto, IRequest<ServiceResult<ListDto<LandingSliderDto>>> {}
    public class GetLandingSlideByIdQuery : IRequest<ServiceResult<LandingSliderDto?>>
    {
        public int Id { get; set; }
    }
    public class GetLandingSlideQuery : BaseListDto, IRequest<ServiceResult<IEnumerable<LandingSliderDto>>> { }


}
