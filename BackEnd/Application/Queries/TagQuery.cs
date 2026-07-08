using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{

    public class GetTagsQuery :BaseListDto, IRequest<ServiceResult<ListDto<TagDto>>> { }
    public class GetTags4selectOptionQuery : BaseListDto,IRequest<ServiceResult<ListDto<SelectOptionDto>>> {}
    public class GetTagBySlugQuery : IRequest<ServiceResult<TagDto>>
    {
        public string Slug { get; set; } = string.Empty;



    }
    public class GetAllTagIdsQuery : IRequest<ServiceResult<List<IdDto>>>
    {
        
    }


    public class GetTagsByProductOfferIdQuery : IRequest<ServiceResult<IEnumerable<TagDto>>>
    {
        public int ProductId { get; set; }

       
    }
    public class GetProductSByTagIdQuery : IRequest<ServiceResult<IEnumerable<ProductDto>>>
    {
        public int TagId { get; set; }
 
    };

   
    }
