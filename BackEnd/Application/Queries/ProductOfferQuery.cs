using Application.Dtos;
using Common;
using MediatR;
 

namespace Application.Queries
{
    public class GetProductOffersQuery :BaseListDto, IRequest<ServiceResult<ListDto<ProductOfferDetailDto?>>>
    {
        
    }
    public class GetProductOffers4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>>
    {
        public int? ProductId { get; set; }

    }
    public class GetSuppliersQuery : BaseListDto, IRequest<ServiceResult<SupplierListDto>>
    {
        public bool? ByConfig { get; set; } = false;
    }
    public class GetSuppliersIdsQuery : IRequest<ServiceResult<List<IdDto?>>>
    {

    }
    public class GetProductOfferByIdQuery : IRequest<ServiceResult<ProductOfferDetailDto?>>
    {
        public int Id { get; set; }

      
    }
    public class GetSuppliersByCategoryIdQuery : BaseListDto, IRequest<ServiceResult<SupplierListDto>>
    {
        public int CategoryId { get; set; }
    }

    public class GetProductOffersByProductIdQuery : IRequest<ServiceResult<List<ProductOfferDto>>>
    {
        public int ProductId { get; set; }

 
    }

    public class GetProductOffersBySellerIdQuery : IRequest<ServiceResult<List<ProductOfferDto>>>
    {
        public int SellerId { get; set; }

 
    }







}
