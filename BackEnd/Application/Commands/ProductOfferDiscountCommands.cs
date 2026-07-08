using Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateProductOfferDiscountCommand : IRequest<ServiceResult<IdDto>>
    {

        public int ProductOfferId { get; set; }
        public int DiscountId { get; set; }
        public CreateProductOfferDiscountCommand(int productOfferId, int discountId)
        {
            ProductOfferId = productOfferId;
            DiscountId = discountId;
        }
    }
    public class ActiveProductOfferDiscountCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteProductOfferDiscountCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
      
    }
    public class UpdateProductOfferDiscountCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public int ProductOfferId { get; set; }
        public int DiscountId { get; set; }
        public UpdateProductOfferDiscountCommand(int id, int productOfferId, int discountId)
        {
            Id = id;
            ProductOfferId = productOfferId;
            DiscountId = discountId;
        }
    }


}
