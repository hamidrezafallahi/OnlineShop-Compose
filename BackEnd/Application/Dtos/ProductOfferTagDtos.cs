using OnlineShop.Domain.Entities;

namespace Application.Dtos
{
    public class ProductOfferTagDto
    {
        public int Id { get; set; }
        public int ProductOfferId { get; set; }
        public int TagId { get; set; }
        public string TagName { get; set; } = string.Empty;
    }
    public class ProductOfferTagsDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string productName { get; set; }
        public string productImage { get; set; }
        public string supplierName { get; set; }
        public string supplierImage { get; set; }
        public string TagName { get; set; } = string.Empty;
    }
    public class ProductOfferTagListDto
    {
        public List<ProductOfferTagDto> Records { get; set; } = new List<ProductOfferTagDto>();
        public string? ColumnsJson { get; set; }
        public string? ActionsJson { get; set; }
        public int TotalCount { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
    }
    public class ProductOfferTagDetailDto : ProductOfferTagDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string User { get; set; }
        public string MainProductImage { get; set; }
        public string UserImage { get; set; }
    }

}
