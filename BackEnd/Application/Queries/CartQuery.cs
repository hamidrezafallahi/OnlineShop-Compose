using Application.Dtos;
using Common;
using MediatR;


namespace Application.Queries
{
    public class GetAllCartsQuery : BaseListDto, IRequest<ServiceResult<ListDto<CartDto>>>
    {
    }
    public class GetCartByIdQuery : IRequest<ServiceResult<CartDto?>>
    {
        public int Id { get; set; }
       
    }
    public class GetDetailCartByIdQuery : IRequest<ServiceResult<detailCartDto?>>
    {
        public int Id { get; set; }
      
    }
    public class GetCartsByUserIdQuery : IRequest<ServiceResult<CartDto>>
    {
     
    }
    public class GetAllCartItemsQuery : BaseListDto, IRequest<ServiceResult<ListDto<CartItemDto>>>
    {
    }
    public class GetCartItemByIdQuery : IRequest<ServiceResult<CartItemDto?>>
    {
        public int Id { get; set; }
     
    }
    public class GetCartItemsByCartIdQuery : IRequest<ServiceResult<IEnumerable<CartItemDto>>>
    {
        public int Id { get; set; }
    }
}
