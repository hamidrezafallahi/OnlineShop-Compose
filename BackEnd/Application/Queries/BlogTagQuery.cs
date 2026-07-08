using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
 
    public class GetAllBlogTagsQuery : BaseListDto, IRequest<ServiceResult<ListDto<BlogTagDto>>>
    {
    }
    public class GetBlogTagByIdQuery :IRequest<ServiceResult<BlogTagDto>>
    {
        public int Id { get; set; }
    }
     
}
