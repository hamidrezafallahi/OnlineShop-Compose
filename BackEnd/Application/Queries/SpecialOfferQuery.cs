using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetSpecialOffersQuery : BaseListDto, IRequest<ServiceResult<ListDto<SpecialOffersDto>>>
    {}
    public class GetLandingSpecialOffersQuery : BaseListDto, IRequest<ServiceResult<ListDto<LandingSpecialOffersDto>>>
    { }

    public class GetSpecialOfferByIdQuery : IRequest<ServiceResult<SpecialOffersDto?>>
    {
        public int Id { get; set; }
    }
 
}
