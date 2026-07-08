using Application.Dtos;
using Common;
using MediatR;

#region Product Queries

public class GetAllProductsQuery :BaseListDto, IRequest<ServiceResult<ListDto<ProductDto>>>
{
 
}
public class GetLandingProductsQuery : IRequest<ServiceResult<List<TheMostProductDto>>>
{
    public bool? BestSeller { get; set; }
    public bool? TheNewest { get; set; }
    public bool? Discounters { get; set; }
}
public class GetProducts4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>>
{
 

}
public class GetAllProductsByDetailQuery : IRequest<ServiceResult<IEnumerable<ProductByDetailDto>>>
{
    public GetAllProductsByDetailQuery() { }
}
public class GetAllProductsIdQuery : IRequest<ServiceResult<List<IdDto>>>
{
   
}
public class GetDiscountedProductsQuery : IRequest<ServiceResult<IEnumerable<ProductDto>>>
{
   
}
public class GetProductByIdQuery : IRequest<ServiceResult<ProductByDetailDto?>>
{
    public int Id { get; set; }

    
}
public class GetProductSpecialsByIdQuery : IRequest<ServiceResult<ProductSpecialsByIdDto?>>
{
    public int Id { get; set; }

    public GetProductSpecialsByIdQuery(int id)
    {
        Id = id;
    }
}
public class GetProductsByCategoryIdQuery : IRequest<ServiceResult<IEnumerable<ProductByDetailDto>>>
{
    public int CategoryId { get; set; }

    public GetProductsByCategoryIdQuery(int categoryId)
    {
        CategoryId = categoryId;
    }
}
public class SearchProductsByNameQuery : IRequest<ServiceResult<IEnumerable<ProductDto>>>
{
    public string Keyword { get; set; }

    public SearchProductsByNameQuery(string keyword)
    {
        Keyword = keyword;
    }
}
public class GetProductsByBrandIdQuery : IRequest<ServiceResult<IEnumerable<ProductCardDto>>>
{
    public int BrandId { get; set; }

    public GetProductsByBrandIdQuery(int brandId)
    {
        BrandId = brandId;
    }
}
public class GetProductsCategoriesByBrandIdQuery : IRequest<ServiceResult<IEnumerable<CategoryDto>>>
{
    public int BrandId { get; set; }

    public GetProductsCategoriesByBrandIdQuery(int brandId)
    {
        BrandId = brandId;
    }
}
public class GetProductsSuppliersByBrandIdQuery : IRequest<ServiceResult<IEnumerable<UserDto>>>
{
    public int BrandId { get; set; }

    public GetProductsSuppliersByBrandIdQuery(int brandId)
    {
        BrandId = brandId;
    }
}
#endregion