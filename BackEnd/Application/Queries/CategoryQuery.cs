using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllCategoriesQuery :BaseListDto, IRequest<ServiceResult<ListDto<CategoryDto>>>
    {
 
        public bool? IsShowInLanding { get; set; }

    }

    public class GetCategoryByIdQuery : IRequest<ServiceResult<CategoryDto>>
    {
        public int Id { get; set; }
    }
    public class GetAllCategoriesIdQuery : IRequest<ServiceResult<IEnumerable<IdDto?>>>
    {
        public GetAllCategoriesIdQuery() { }
    }
    public class GetParent4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>>
    {
        public int? Id { get; set; }

    }
}
