using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllBrandsQuery : BaseListDto, IRequest<ServiceResult<ListDto<BrandDto>>> {}

    public class GetBrands4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>> {}
    public class GetBrandByIdQuery : IRequest<ServiceResult<BrandDto?>>
    {
        public string IdOrSlug { get; set; } = string.Empty;
    }
    public class GetAllBrandsIdQuery : IRequest<ServiceResult<IEnumerable<IdDto>>>
    {
        public GetAllBrandsIdQuery() { }
    }
    public class GetAllBrandsSlugsQuery : IRequest<ServiceResult<IEnumerable<SlugDto>>>
    {
    }
  


}
