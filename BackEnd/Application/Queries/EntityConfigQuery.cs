using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetEntityConfigsQuery : BaseListDto, IRequest<ServiceResult<ListDto<EntityConfigDto>>>{}
    public class GetEntityConfigByIdQuery : IRequest<ServiceResult<EntityConfigDto?>>
    {
        public int Id { get; set; }
    }
    public class GetEntityConfigByNameQuery : IRequest<ServiceResult<EntityConfigDto?>>
    {
        public string EntityName { get; set; } = null!;
    }
    public class GetMenuQuery : IRequest<ServiceResult<List<MenuReadModel>>>
    {
       
    }
    public class GetFormQuery : IRequest<ServiceResult<FormReadModel>>
    {
        public string EntityName { get; set; } = null!;
    }
}
