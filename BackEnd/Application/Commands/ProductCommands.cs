using Application.Dtos;
using Common;
using MediatR;

namespace Application.Commands
{
    public class CreateProductCommand : ProductDimensionsDto, IRequest<ServiceResult<IdDto>>
    {

        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public int CategoryId { get; set; }
        public int BrandId { get; set; }
     }

    public class CreateProductImageCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Name { get; set; } = default!;
        public string Description { get; set; } = default!;
        public int CategoryId { get; set; }
        public int? BrandId { get; set; }

        //public int? DiscountId { get; set; }
        //public List<ProductImageDto>? Images { get; set; } = new();
    }
    public class UpdateProductCommand : ProductDimensionsDto, IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? Name { get; set; } = default!;
        public string? Description { get; set; } = default!;
        public int? CategoryId { get; set; }
        public int? BrandId { get; set; }
        //public int? DiscountId { get; set; }
        //public List<ProductImageDto>? Images { get; set; } = new();
        //public ProductDimensionsDto? Dimensions { get; set; }
        //public List<ProductSpecificationDto>? Specifications { get; set; } = new();
    };
    //public class UpdateProductImageCommand : IRequest<ServiceResult<IdDto>>
    //{
    //    public int Id { get; set; }
    //    public int ProductId { get; set; }
    //    public string ImageUrl { get; set; } = default!;
    //    public bool IsMain { get; set; }
    //}




    public class DeleteProductCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; } 
 
    }
    public class ActiveProductCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteProductImageCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

    }

}
