using Application.Dtos;
using Common;
using MediatR;
namespace Application.Queries
{
 
    public class GetAllProductOfferTagQuery : BaseListDto, IRequest<ServiceResult<ListDto<ProductOfferTagsDto>>>
    {
    }
    public class GetProductOfferTagByIdQuery :IRequest<ServiceResult<ProductOfferTagDetailDto>>
    {
        public int Id { get; set; }
    }
    public class GetProductOfferTagByProductIdQuery : IRequest<ServiceResult<IEnumerable<ProductOfferTagDto>>>
    {
        public int ProductId { get; set; }
        public GetProductOfferTagByProductIdQuery(int productId) => ProductId = productId;
    };
    public class GetAllProductOfferTagByTagIdQuery : IRequest<ServiceResult<IEnumerable<ProductCardBySupplierDto>>>
    {
        public int TagId { get; set; }
        public GetAllProductOfferTagByTagIdQuery(int tagId) => TagId = tagId;
    };

    public class GetAllProductOfferTagIdsQuery : IRequest<ServiceResult<List<IdDto>>>
    {
        public GetAllProductOfferTagIdsQuery() { }
    }

}
