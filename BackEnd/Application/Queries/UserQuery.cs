using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
    public class GetUsersQuery :BaseListDto, IRequest<ServiceResult<ListDto<UserDto>>>
    {

    }
    public class GetUserByIdQuery : IRequest<ServiceResult<UserDto?>>
    {
        public int Id { get; set; }

    }
    public class GetUsers4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>>
    {
        public int? UserId { get; set; }

    }

    public class GetAddressesQuery : BaseListDto, IRequest<ServiceResult<ListDto<UserAddressDto>>>
    {
    }
    public class GetUserAddressByUserIdQuery : IRequest<ServiceResult<List<UserAddressDto>>>
    {
        public int UserId { get; set; }

    }
    public class GetUserAddressByUserQuery : IRequest<ServiceResult<List<UserAddressDto>>>
    {
    }
    public class GetUserAddressByIdQuery : IRequest<ServiceResult<UserAddressDto>>
    {
        public int Id { get; set; }

    }

    public class GetDefaultUserAddressByUserIdQuery : IRequest<ServiceResult<UserAddressDto?>>
    {

    }

}
