using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetAllProductOfferDiscountQuery :BaseListDto, IRequest<ServiceResult<ListDto<ProductOfferDiscountDto>>>
    {
    };
    public class GetProductOfferDiscountByIdQuery : IRequest<ServiceResult<ProductOfferDiscountDto>>
    {
        public int Id { get; set; }
    };
    public class GetProductOfferDiscountByProductIdQuery : IRequest<ServiceResult<IEnumerable<ProductOfferDiscountDto>>>
    {
        public int ProductOfferId { get; set; }



    };
    public class GetAllProductOfferDiscountByDiscountIdQuery : IRequest<ServiceResult<IEnumerable<ProductOfferDiscountDto>>>
    {
        public int DiscountId { get; set; }
        public GetAllProductOfferDiscountByDiscountIdQuery(int discountId) => DiscountId = discountId;

    };

   
    }
