using Application.Dtos;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
public class ProductImagesQueryHandler(
        IProductImageRepository _repo,
         IEntityConfigRepository _configRepo,
        IHttpContextAccessor _accessor) : 
    IRequestHandler<GetAllProductImagesQuery, ServiceResult<ListDto<GetProductImageDto>>>,
    IRequestHandler<GetMainImageByProductIdQuery, ServiceResult<GetProductImageDto>>,
    IRequestHandler<GetProductImagesByIdQuery, ServiceResult<GetProductImageDto>>
{
    public async Task<ServiceResult<ListDto<GetProductImageDto>>> Handle( GetAllProductImagesQuery request,  CancellationToken cancellationToken)
    {
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;
        IQueryable<ProductImage> query;
        if (request.Q is not null && request.Q.Length > 0)
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {

                query = _repo.Query().Include(i => i.Product).Where(i => i.Product.Name.Contains(request.Q));
            }
            else
            {
                query = _repo.Query(b => b.IsActive).Include(i => i.Product).Where(i => i.Product.Name.Contains(request.Q));
            }

             
        }
        else
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {

                query = _repo.Query().Include(i => i.Product);
            }
            else
            {
                query = _repo.Query(b => b.IsActive).Include(i => i.Product);
            }
        }

       


        int totalCount = await query.CountAsync(cancellationToken);
        var pagedproductImages = await query
    .Skip((pageNumber - 1) * pageSize).Take(pageSize)
            .ToListAsync(cancellationToken);
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var productImagesDto = pagedproductImages.Select(p => new GetProductImageDto
        {
            Id = p.Id,
            IsMain = p.IsMain,
            ProductId = p.ProductId,
            ProductName = p.Product.Name,
            IsActive = p.IsActive,
            ProductImageUrl = $"{domainUrl}/{p.ImageUrl.TrimStart('/')}",
        }).ToList();

        dynamic? config = null;

        if (request.ByConfig == true)
        {
            config = await _configRepo.GetByEntityNameAsync("productImages");
        }

        var resultDto = new ListDto<GetProductImageDto>
        {
            Records = productImagesDto,
            ColumnsJson = config?.ColumnsJson,
            ActionsJson = config?.ActionsJson,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

        return ServiceResult<ListDto<GetProductImageDto>>.Ok(resultDto);

     
    }
    public async Task<ServiceResult<GetProductImageDto>> Handle( GetMainImageByProductIdQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var productMainImage = _repo.Query(p => !p.IsDeleted && p.IsActive && p.ProductId == request.ProductId && p.IsMain)
            .Select(p => new GetProductImageDto
            {
                Id = p.Id,
                IsMain = p.IsMain,
                ProductId = p.ProductId,
                ProductImageUrl = $"{domainUrl}/{p.ImageUrl.TrimStart('/')}"
            }).FirstOrDefault();


        return ServiceResult<GetProductImageDto>.Ok(productMainImage);
    }
    public async Task<ServiceResult<GetProductImageDto>> Handle(GetProductImagesByIdQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var productMainImage = _repo.Query(p => !p.IsDeleted && p.IsActive && p.Id == request.Id)
            .Select(p => new GetProductImageDto
            {
                Id = p.Id,
                IsMain = p.IsMain,
                ProductId = p.ProductId,
                ProductImageUrl = $"{domainUrl}/{p.ImageUrl.TrimStart('/')}"
            }).FirstOrDefault();
        return ServiceResult<GetProductImageDto>.Ok(productMainImage);
    }


}
 