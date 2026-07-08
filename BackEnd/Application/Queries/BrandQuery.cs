using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllBrandsQuery : BaseListDto, IRequest<ServiceResult<ListDto<BrandDto>>> {}

    public class GetBrands4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>> {}
    public class GetBrandByIdQuery : IRequest<ServiceResult<BrandDto?>>
    {
        public int Id { get; set; }
    }
    public class GetAllBrandsIdQuery : IRequest<ServiceResult<IEnumerable<IdDto>>>
    {
        public GetAllBrandsIdQuery() { }
    }
  


}
