using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
 
    public class GetAllUserTagsQuery : BaseListDto, IRequest<ServiceResult<ListDto<UserTagDto>>>
    {
    }
    public class GetUserTagByIdQuery :IRequest<ServiceResult<UserTagDto>>
    {
        public int Id { get; set; }
    }
     
}
