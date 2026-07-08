using Application.Dtos;
using Application.Queries;
using Common;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
public class ProductOfferTagQueryHandler(IProductOfferTagRepository _repo,
            IHttpContextAccessor _accessor,
            IEntityConfigRepository _configRepo)
        : IRequestHandler<GetAllProductOfferTagQuery, ServiceResult<ListDto<ProductOfferTagsDto>>>,
        IRequestHandler<GetProductOfferTagByIdQuery, ServiceResult<ProductOfferTagDetailDto>>,
    IRequestHandler<GetProductOfferTagByProductIdQuery, ServiceResult<IEnumerable<ProductOfferTagDto>>>,
    IRequestHandler<GetAllProductOfferTagByTagIdQuery, ServiceResult<IEnumerable<ProductCardBySupplierDto>>>,
    IRequestHandler<GetAllProductOfferTagIdsQuery, ServiceResult<List<IdDto>>>
{
       public async Task<ServiceResult<ListDto<ProductOfferTagsDto>>> Handle(GetAllProductOfferTagQuery request,CancellationToken cancellationToken)
        {
            int pageNumber = request.page ?? 1;
            int pageSize = request.pageSize ?? 10;
        IQueryable<ProductOfferTag> query;
        if (!request.OnlyActives.HasValue || request.OnlyActives == false)
        {

            query = _repo.Query().Include(pot => pot.Tag)
                .Include(pot => pot.ProductOffer).ThenInclude(po => po.Product).ThenInclude(p => p.Images)
                .Include(pot => pot.ProductOffer).ThenInclude(po => po.Supplier);
        }
        else
        {
            query = _repo.Query(b => b.IsActive).Include(pot => pot.Tag)
                .Include(pot => pot.ProductOffer).ThenInclude(po => po.Product).ThenInclude(p => p.Images)
                .Include(pot => pot.ProductOffer).ThenInclude(po => po.Supplier);
        }
            int totalCount = await query.CountAsync(cancellationToken);
            var pagedProductTags = await query.Where(pt => !pt.IsDeleted)
                .Include(pt => pt.Tag)
        .Skip((pageNumber - 1) * pageSize).Take(pageSize)
                .ToListAsync(cancellationToken);
            var req = _accessor.HttpContext?.Request;
            string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
            var ProductTagsDto = pagedProductTags.Select(pt => new ProductOfferTagsDto
            {
                Id = pt.Id,
                IsActive=pt.IsActive,
               productName=pt.ProductOffer.Product.Name,
               productImage = !string.IsNullOrEmpty(pt.ProductOffer.Product.Images.Where(i => i.IsMain).Select(i => i.ImageUrl).First())
                ? $"{domainUrl}/{pt.ProductOffer.Product.Images.Where(i => i.IsMain && !i.IsDeleted).Select(i => i.ImageUrl).First().TrimStart('/')}"
                : null,
               supplierName=pt.ProductOffer.Supplier.FullName,
               supplierImage= !string.IsNullOrEmpty(pt.ProductOffer.Supplier.Image)? $"{domainUrl}/{pt.ProductOffer.Supplier.Image.TrimStart('/')}"
                : null,
                TagName = pt.Tag?.Name ?? string.Empty
            }).ToList();
            dynamic? config = null;
            if (request.ByConfig == true)
            {
                config = await _configRepo.GetByEntityNameAsync("productOfferTags");
            }
            var resultDto = new ListDto<ProductOfferTagsDto>
            {
                Records = ProductTagsDto,
                ColumnsJson = config?.ColumnsJson,
                ActionsJson = config?.ActionsJson,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
            };
            return ServiceResult<ListDto<ProductOfferTagsDto>>.Ok(resultDto);
        }
       public async Task<ServiceResult<ProductOfferTagDetailDto>> Handle(GetProductOfferTagByIdQuery request, CancellationToken cancellationToken)
        {
            var req = _accessor.HttpContext?.Request;
            string domainUrl = req?.Scheme + "://" + req.Host ?? "";

            var productOfferTag = await _repo
                .Query()
                .Include(pot => pot.ProductOffer)
                    .ThenInclude(po => po.Product)
                        .ThenInclude(p => p.Images)
                .Include(pot => pot.ProductOffer.Supplier)
                .Include(pot => pot.Tag)
                .FirstOrDefaultAsync(pot => pot.Id == request.Id, cancellationToken);

            if (productOfferTag == null)
                return ServiceResult<ProductOfferTagDetailDto>.Failed("productOfferTag not found");

            var mainImageUrl = productOfferTag.ProductOffer.Product.Images
                .FirstOrDefault(i => i.IsMain)?.ImageUrl;

            var mainImagePath = mainImageUrl != null
                ? $"{domainUrl}/{mainImageUrl.TrimStart('/')}"
                : null;
            var userImageUrl = productOfferTag.ProductOffer.Supplier.Image;

            var userImagePath = mainImageUrl != null
                ? $"{domainUrl}/{mainImageUrl.TrimStart('/')}"
                : null;

            var dto = new ProductOfferTagDetailDto
            {
                Id = productOfferTag.Id,
                ProductId = productOfferTag.ProductOffer.Product.Id,
                Name = productOfferTag.ProductOffer.Product.Name,
                User = productOfferTag.ProductOffer.Supplier.FullName,
                MainProductImage = mainImagePath,
                UserImage = userImagePath,
                ProductOfferId = productOfferTag.ProductOfferId,
                TagId = productOfferTag.TagId,
                TagName = productOfferTag.Tag?.Name ?? string.Empty
            };

            return ServiceResult<ProductOfferTagDetailDto>.Ok(dto);
        }
    public async Task<ServiceResult<IEnumerable<ProductOfferTagDto>>> Handle(GetProductOfferTagByProductIdQuery request, CancellationToken cancellationToken)
    {
        var productOfferTags = await _repo
            .Query()
            .Include(pot => pot.ProductOffer)
            .ThenInclude(po => po.Product)
            .Include(pt => pt.Tag)
            .Where(pot => pot.ProductOffer.Product.Id == request.ProductId && !pot.IsDeleted).GroupBy(pot => pot.TagId)
            .ToListAsync(cancellationToken);

        var dtos = productOfferTags.Select(pt => new ProductOfferTagDto
        {
            Id = pt.First().Id,
            ProductOfferId = pt.First().ProductOfferId,
            TagId = pt.First().TagId,
            TagName = pt.First().Tag?.Name ?? string.Empty
        }).ToList();

        return ServiceResult<IEnumerable<ProductOfferTagDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<IEnumerable<ProductCardBySupplierDto>>> Handle(GetAllProductOfferTagByTagIdQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;


        var productTags = await _repo
            .Query(pt => pt.TagId == request.TagId && !pt.IsDeleted)
            .Include(pt => pt.Tag)
            .Include(pt => pt.ProductOffer).ThenInclude(po => po.Supplier)
            .Include(pt => pt.ProductOffer).ThenInclude(po => po.Product).ThenInclude(p => p.Images).GroupBy(g => g.ProductOffer.Product.Id)
            .ToListAsync(cancellationToken);

        var dtos = productTags.Select(pt =>

            new ProductCardBySupplierDto
            {

                Id = pt.FirstOrDefault().ProductOffer.Product.Id,
                Name = pt.FirstOrDefault().ProductOffer.Product.Name,
                Description = pt.FirstOrDefault().ProductOffer.Product.Description,
                MainImage = pt.FirstOrDefault().ProductOffer.Product.Images
              .Where(i => !i.IsDeleted && i.IsMain)
              .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
              .FirstOrDefault(),
                suppliers = new List<SupplierDto>([new SupplierDto { Id = pt.FirstOrDefault().ProductOffer.Supplier.Id,
                FullName = pt.FirstOrDefault().ProductOffer.Supplier.FullName,
                Image = $"{domainUrl}/{pt.FirstOrDefault().ProductOffer.Supplier.Image.TrimStart('/')}"}
            ]),
            }).ToList();
        return ServiceResult<IEnumerable<ProductCardBySupplierDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<List<IdDto>>> Handle(GetAllProductOfferTagIdsQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var productOfferTagIds = _repo.Query(p => p.IsActive).Select(p => new IdDto { Id = p.Id }).ToList();
        return ServiceResult<List<IdDto>>.Ok(productOfferTagIds);
    }
}

