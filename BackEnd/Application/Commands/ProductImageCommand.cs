// AddProductImageCommand.cs
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;

public class AddProductImageCommand : IRequest<ServiceResult<IdDto>>
{
    public int ProductId { get; set; }
    public List<IFormFile>? Images { get; set; } = new();
    public List<bool>? IsMainImages { get; set; } = new();
}

// UpdateProductImageCommand.cs
//public class UpdateProductImageCommand : IRequest<ServiceResult<IdDto>>
//{
//    public int ImageId { get; set; }
//    public IFormFile? ProductImageFile { get; set; }
//    public bool? IsMain { get; set; }
//}
public class ActiveProductImageCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
// DeleteProductImageCommand.cs
public class DeleteProductImageCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
}

// GetProductImagesQuery.cs


