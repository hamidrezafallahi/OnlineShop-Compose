using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
    public class GetRolesQuery :BaseListDto, IRequest<ServiceResult<ListDto<UserRoleDto>>> { }

    public class GetRoleByIdQuery : IRequest<ServiceResult<UserRoleDto?>>
    {
        public int Id { get; set; }
    }

}
