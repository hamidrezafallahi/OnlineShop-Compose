using Common;
using MediatR;
namespace Application.Commands
{
    public class CreateProductOfferCommand : IRequest<ServiceResult<IdDto>>
    {
        public int ProductId { get; set; }
        public decimal BasePrice { get; set; }
        public int Inventory { get; set; }
    }

    public class UpdateProductOfferCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public decimal? BasePrice { get; set; }
        public int? Inventory { get; set; }
        public bool? IsActive { get; set; }
    }

    public class DeleteProductOfferCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

    }
    public class ActiveProductOfferCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
}
