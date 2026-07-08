using Application.Dtos;
using Common;
using MediatR;

namespace Application.Commands
{
    public class CreateCartCommand : IRequest<ServiceResult<IdDto>>
    {
        public int UserId { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        //public decimal TotalPrice => Items.Sum(i => i. * i.Quantity);



    }
    public class UpdateCartCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();
        //public decimal TotalPrice => Items.Sum(i => i. * i.Quantity);

    }
    public class DeleteCartCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
    public class ActiveCartCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }


    public class AddOrUpdateCartItemCommand : IRequest<ServiceResult<CartReadModel>>
    {
        public int ProductId { get; set; }
        public int ProductOfferId { get; set; }
        public int Quantity { get; set; }
    }
    public class DecreaseCartItemCommand : IRequest<ServiceResult<CartReadModel>>
    {

        public int ProductId { get; set; }

        public int ProductOfferId { get; set; }
    }
    public class UpdateCartItemCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int ProductOfferId { get; set; }
        public int Quantity { get; set; }
    }
    public class DeleteCartItemCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
    public class ActiveCartItemCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class SyncCartCommand : IRequest<ServiceResult<CartReadModel>>
    {
        public List<CartItemSyncDto> ClientItems { get; set; } = new();
    }
    public class ClearCartCommand : IRequest<ServiceResult<IdDto>>
    {}

}
