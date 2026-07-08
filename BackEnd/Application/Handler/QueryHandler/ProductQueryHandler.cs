using Application.Dtos;
using Common;
using Domain.Enums;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using System;

public class ProductQueryHandler(IProductRepository _repo,
        IUserRepository _userRepository,
        ISpecialOfferRepository _specialOfferRepo,
        ICommentRepository _commentRepository,
        IRateRepository _rateRepository,
        IEntityConfigRepository _configRepo,
        IHttpContextAccessor _accessor)
    : IRequestHandler<GetAllProductsQuery, ServiceResult<ListDto<ProductDto>>>,
    IRequestHandler<GetProducts4selectOptionQuery, ServiceResult<ListDto<SelectOptionDto>>>,
    IRequestHandler<GetAllProductsByDetailQuery, ServiceResult<IEnumerable<ProductByDetailDto>>>,
    IRequestHandler<GetAllProductsIdQuery, ServiceResult<List<IdDto>>>,
    IRequestHandler<GetProductByIdQuery, ServiceResult<ProductByDetailDto?>>,
    IRequestHandler<GetProductSpecialsByIdQuery, ServiceResult<ProductSpecialsByIdDto?>>,
    IRequestHandler<GetProductsByCategoryIdQuery, ServiceResult<IEnumerable<ProductByDetailDto>>>,
    IRequestHandler<GetDiscountedProductsQuery, ServiceResult<IEnumerable<ProductDto>>>,
    IRequestHandler<SearchProductsByNameQuery, ServiceResult<IEnumerable<ProductDto>>>,
    IRequestHandler<GetLandingProductsQuery, ServiceResult<List<TheMostProductDto>>>,
    IRequestHandler<GetProductsCategoriesByBrandIdQuery, ServiceResult<IEnumerable<CategoryDto>>>,
    IRequestHandler<GetProductsByBrandIdQuery, ServiceResult<IEnumerable<ProductCardDto>>>,
    IRequestHandler<GetProductsSuppliersByBrandIdQuery, ServiceResult<IEnumerable<UserDto>>>

{
    public async Task<ServiceResult<ListDto<ProductDto>>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var req = _accessor.HttpContext?.Request;
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        IQueryable<Product> query;
        if (request.Q is not null && request.Q.Length > 0)
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {
                query = _repo.Query(b => b.Name.Contains(request.Q)).Include(p => p.Images).Include(p => p.Brand).Include(p => p.Category);
            }
            else
            {
                query = _repo.Query(b => b.IsActive && (b.Description.Contains(request.Q) || b.Name.Contains(request.Q))).Include(p => p.Images).Include(p => p.Brand).Include(p => p.Category);
            }
        }
        else
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {

                query = _repo.Query().Include(p => p.Images).Include(p=>p.Brand).Include(p=>p.Category);
            }
            else
            {
                query = _repo.Query(b => b.IsActive).Include(p => p.Images).Include(p => p.Brand).Include(p => p.Category);
            }
        }
        int totalCount = await query.CountAsync(cancellationToken);
        var pagedProducts = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        var dtos = pagedProducts.Select(x => new ProductDto
        {
            Id = x.Id,
            Name = x.Name,
            Description = x.Description,
            BrandId = x.BrandId,
            BrandName=x.Brand.Name,
            CategoryId = x.CategoryId,
            CategoryName= $"{x.Category.PersianName} _ {x.Category.EnglishName}",
            IsActive =x.IsActive,
            Dimentions = x.Dimensions != null
        ? new ProductDimensionsDto
        {
            Width = x.Dimensions.Width,
            Height = x.Dimensions.Height,
            Depth = x.Dimensions.Depth,
            Weight = x.Dimensions.Weight
        }
        : null,
            MainImage = !string.IsNullOrEmpty(x.Images.Where(i => i.IsMain && !i.IsDeleted).Select(i => i.ImageUrl).FirstOrDefault())
                ? $"{domainUrl}/{x.Images.Where(i => i.IsMain && !i.IsDeleted).Select(i => i.ImageUrl).FirstOrDefault().TrimStart('/')}"
                : null  
        }).ToList();



        dynamic? config = null;

        if (request.ByConfig == true)
        {
            config = await _configRepo.GetByEntityNameAsync("products");
        }
        var resultDto = new ListDto<ProductDto>
        {
            Records = dtos,
            ColumnsJson = config?.ColumnsJson,
            ActionsJson = config?.ActionsJson,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

        return ServiceResult<ListDto<ProductDto>>.Ok(resultDto);
    }
    public async Task<ServiceResult<ListDto<SelectOptionDto>>> Handle(GetProducts4selectOptionQuery request, CancellationToken ct)
    {
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;
 
        IQueryable<Product> query;
        query = _repo.Query(c => c.IsActive );
        int totalCount = await query.CountAsync(c => c.IsActive);
        var pagedUsers = await query
    .Skip((pageNumber - 1) * pageSize).Take(pageSize)
            .ToListAsync(ct);
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var flatDtos = pagedUsers.Select(c => new SelectOptionDto
        {
            Id = c.Id,
            PersianLabel = c.Name,
            EnglishLabel = c.Name
        }).ToList();
        var resultDto = new ListDto<SelectOptionDto>
        {
            Records = flatDtos,
            ColumnsJson = null,
            ActionsJson = null,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

        return ServiceResult<ListDto<SelectOptionDto>>.Ok(resultDto);

    }
    public async Task<ServiceResult<IEnumerable<ProductByDetailDto>>> Handle(GetAllProductsByDetailQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;

        var products = await _repo.Query(p => p.IsActive)
            .Include(p => p.Images)
            .ToListAsync(cancellationToken);

        var dtos = products.Select(x =>
        {


            return new ProductByDetailDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                BrandId = x.BrandId,
                CategoryId = x.CategoryId,
                ImageUrls = x.Images
                    .Where(i => !i.IsDeleted)
                    .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                    .ToList(),

                Dimensions = x.Dimensions == null ? null : new ProductDimensionsDto
                {
                    Width = x.Dimensions.Width,
                    Height = x.Dimensions.Height,
                    Depth = x.Dimensions.Depth,
                    Weight = x.Dimensions.Weight
                },


            };
        })
        .Where(dto => dto != null)
        .ToList();

        return ServiceResult<IEnumerable<ProductByDetailDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<List<IdDto>>> Handle(GetAllProductsIdQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;

        var productIds = _repo.Query(p => p.IsActive).Select(p => new IdDto { Id = p.Id }).ToList();

        return ServiceResult<List<IdDto>>.Ok(productIds);
    }
    public async Task<ServiceResult<ProductByDetailDto?>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";

        var product = await _repo.Query(p => !p.IsDeleted && p.Id == request.Id)
            .Include(p => p.ProductOffers).ThenInclude(pt => pt.ProductOfferTags).ThenInclude(t => t.Tag)
            .Include(p => p.Images)
            .FirstOrDefaultAsync(cancellationToken);
        if (product == null) return ServiceResult<ProductByDetailDto?>.Failed("product not found");

        if (product is not null)
        {

            var rate = await _rateRepository.GetAverageRateAsync(EnumTargetType.Product, product.Id);
        }



        var dto = new ProductByDetailDto
        {
            Id = product.Id,
            Name = product.Name,
            Description = product.Description,
            BrandId = product.BrandId,
            CategoryId = product.CategoryId,
            ImageUrls = product.Images
                .Where(i => !i.IsDeleted)
                .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                .ToList(),

            MainImage = product.Images
                .Where(i => !i.IsDeleted && i.IsMain)
                .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                .FirstOrDefault(),


            Width = product.Dimensions.Width,
            Height = product.Dimensions.Height,
            Depth = product.Dimensions.Depth,
            Weight = product.Dimensions.Weight
            
        };

        return ServiceResult<ProductByDetailDto?>.Ok(dto);
    }
    public async Task<ServiceResult<ProductSpecialsByIdDto?>> Handle(GetProductSpecialsByIdQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";

        var product = await _repo.GetProductWithDetailsAsync(request.Id);
        if (product == null || product.IsDeleted)
            return ServiceResult<ProductSpecialsByIdDto?>.Failed("Product not found");
        var dto = new ProductSpecialsByIdDto
        {
            Id = product.Id,
            Name = product.Name,

            Specifications = product.Specifications
                .Where(s => !s.IsDeleted)
                .Select(s => new ProductSpecificationDto { Key = s.Key, Value = s.Value })
                .ToList()
        };

        return ServiceResult<ProductSpecialsByIdDto?>.Ok(dto);
    }
    public async Task<ServiceResult<IEnumerable<ProductByDetailDto>>> Handle(GetProductsByCategoryIdQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;

        var products = await _repo.Query(p => !p.IsDeleted && p.CategoryId == request.CategoryId)
            .Include(p => p.Images)
            .ToListAsync(cancellationToken);

        var dtos = products.Select(x =>
        {
            return new ProductByDetailDto
            {
                Id = x.Id,
                Name = x.Name,
                Description = x.Description,
                BrandId = x.BrandId,
                CategoryId = x.CategoryId,

                MainImage = x.Images
                    .Where(i => !i.IsDeleted && i.IsMain)
                    .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                    .FirstOrDefault(),
            };
        })
            .ToList();

        return ServiceResult<IEnumerable<ProductByDetailDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<IEnumerable<ProductDto>>> Handle(GetDiscountedProductsQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;

        var products = await _repo.Query(p => !p.IsDeleted)
            .Include(p => p.ProductOffers).ThenInclude(po => po.Discounts).ThenInclude(pd => pd.Discount)
            .Include(p => p.Images)
            .Where(p => p.ProductOffers.Any(po => po.IsActive && !po.IsDeleted &&
                                                 po.Discounts.Any(pd => !pd.IsDeleted && pd.IsActive && 
                                !pd.Discount.IsDeleted &&
                                pd.Discount.IsActive &&
                  pd.Discount.StartDate <= now && pd.Discount.EndDate >= now)))
            .Select(p => new
            {
                p.Id,
                p.Name,
                p.Description,
                p.BrandId,
                p.CategoryId,
                BestOffer = p.ProductOffers
                    .Where(po => po.IsActive && !po.IsDeleted && po.Inventory > 0)
                    .OrderBy(po => po.BasePrice)
                    .FirstOrDefault()
            })
            .ToListAsync(cancellationToken);

        var dtos = products
            .Where(x => x.BestOffer != null)
            .Select(p => new ProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                BrandId = p.BrandId,
                CategoryId = p.CategoryId,
                MainImage = p.BestOffer.Product?.Images
                    ?.Where(i => !i.IsDeleted)
                    .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                    .FirstOrDefault()
            })
            .ToList();

        return ServiceResult<IEnumerable<ProductDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<IEnumerable<ProductDto>>> Handle(SearchProductsByNameQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;

        var products = await _repo.SearchByNameAsync(request.Keyword);

        var dtos = products.Select(p => new ProductDto
        {
            Id = p.Id,
            Name = p.Name,
            Description = p.Description,
            BrandId = p.BrandId,
            CategoryId = p.CategoryId,
            // قیمت و موجودی دیگر مستقیم وجود ندارند
            // اگر بخواهید اضافه کنید:
            // Price = p.ProductOffers.OrderBy(po => po.GetFinalPrice(now)).FirstOrDefault()?.BasePrice ?? 0,
            // FinalPrice = p.ProductOffers.OrderBy(po => po.GetFinalPrice(now)).FirstOrDefault()?.GetFinalPrice(now) ?? 0
        }).ToList();

        return ServiceResult<IEnumerable<ProductDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<List<TheMostProductDto>>> Handle(GetLandingProductsQuery request, CancellationToken cancellationToken)
    {
        var req = _accessor.HttpContext?.Request;
        string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
        var now = DateTime.UtcNow;

        IQueryable<Product> query;

        if (request.BestSeller == true)
        {
            // منطق بهترین فروشنده نیاز به Order دارد (فعلاً ساده)
            query = _repo.Query(p => p.IsActive && !p.IsDeleted)
                .Include(p => p.ProductOffers).ThenInclude(po => po.Discounts).ThenInclude(pd => pd.Discount)
                .Include(p => p.Images)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .OrderByDescending(p => p.UpdatedAt)
                .Take(5);
        }
        else if (request.TheNewest == true)
        {
            query = _repo.Query(p => p.IsActive && !p.IsDeleted)
                .Include(p => p.ProductOffers).ThenInclude(po => po.Discounts).ThenInclude(pd => pd.Discount)
                .Include(p => p.Images)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                //.Where(p => p.ProductOffers.Any(po => po.Discounts.Any(pd => pd.Discount.IsActive)))
                .OrderByDescending(p => p.UpdatedAt)
                .Take(5);
        }
        else
        {
            query = _repo.Query(p => p.IsActive && !p.IsDeleted)
                .Include(p => p.ProductOffers).ThenInclude(po => po.Discounts).ThenInclude(pd => pd.Discount)
                .Include(p => p.Images)
                .Include(p => p.Category)
                .Include(p => p.Brand)
                .OrderByDescending(p => p.UpdatedAt)
                .Take(5);
        }

        var products = await query.ToListAsync(cancellationToken);

        var dtos = new List<TheMostProductDto>();

        foreach (var p in products)
        {
            var bestOffer = p.ProductOffers
                .Where(po => po.IsActive && !po.IsDeleted && po.Inventory > 0)
                .OrderBy(po => po.GetFinalPrice(now))
                .FirstOrDefault();

            if (bestOffer == null) continue;

            var rate = await _rateRepository.GetAverageRateAsync(EnumTargetType.Product, p.Id);

            dtos.Add(new TheMostProductDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                Brand = p.Brand?.Name ?? "",
                PersianCategoryName = p.Category?.PersianName ?? "",
                EnglishCategoryName = p.Category?.EnglishName ?? "",
                BestOfferId = bestOffer.Id,
                Price = bestOffer.BasePrice,
                FinalPrice = bestOffer.GetFinalPrice(now),
                DiscountIsPercent = bestOffer.Discounts
                    .Select(d => d.Discount).OrderByDescending(d => d.Priority)
            .FirstOrDefault(d =>
                !d.IsDeleted && d.IsActive && d.StartDate <= now && d.EndDate >= now)?.IsPercent,
                
                DiscountAmount = bestOffer.Discounts
                   .Select(d => d.Discount).OrderByDescending(d => d.Priority)
            .FirstOrDefault(d =>
                !d.IsDeleted && d.IsActive && d.StartDate <= now && d.EndDate >= now)?.Amount,
                MainImage = p.Images
                    .Where(i => !i.IsDeleted && i.IsMain)
                    .Select(i => $"{domainUrl}/{i.ImageUrl.TrimStart('/')}")
                    .FirstOrDefault(),

                AverageRate = rate.Average,
                RateCount = rate.Count
            });
        }

        return ServiceResult<List<TheMostProductDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<IEnumerable<CategoryDto>>> Handle(GetProductsCategoriesByBrandIdQuery request, CancellationToken cancellationToken)
    {
        var requestUrl = _accessor.HttpContext?.Request;
        var domainUrl = requestUrl != null ? $"{requestUrl.Scheme}://{requestUrl.Host}" : "";
        var categories = await _repo.Query(p => p.BrandId == request.BrandId)
        .Include(p => p.Category)
         .GroupBy(p => p.CategoryId)
             .Select(g => new CategoryDto
             {
                 Id = g.Key,
                 CategoryCover = $"{domainUrl}/{g.First().Category.ImageUrl.TrimStart('/')}",
                 CategoryEnglishDesc = g.First().Category.CategoryEnglishDesc,
                 CategoryPersianDesc = g.First().Category.CategoryPersianDesc,
                 EnglishName = g.First().Category.EnglishName,
                 PersianName = g.First().Category.PersianName,
             })
            .ToListAsync(cancellationToken);

        return ServiceResult<IEnumerable<CategoryDto>>.Ok(categories);
    }
    public async Task<ServiceResult<IEnumerable<ProductCardDto>>> Handle(GetProductsByBrandIdQuery request, CancellationToken cancellationToken)
    {
        var requestUrl = _accessor.HttpContext?.Request;
        var baseUrl = requestUrl != null ? $"{requestUrl.Scheme}://{requestUrl.Host}" : "";

        var products = await _repo.Query(p => !p.IsDeleted && p.BrandId == request.BrandId)
            .Include(p => p.Images)
            .Select(p => new ProductCardDto
            {
                Id = p.Id,
                Name = p.Name,
                Description = p.Description,
                MainImage = p.Images
                    .Where(i => !i.IsDeleted && i.IsMain)
                    .Select(i => $"{baseUrl}/{i.ImageUrl.TrimStart('/')}")
                    .FirstOrDefault(),

            })
            .ToListAsync(cancellationToken);

        return ServiceResult<IEnumerable<ProductCardDto>>.Ok(products);
    }
    public async Task<ServiceResult<IEnumerable<UserDto>>> Handle(GetProductsSuppliersByBrandIdQuery request, CancellationToken cancellationToken)
    {
        var requestUrl = _accessor.HttpContext?.Request;
        var domainUrl = requestUrl != null ? $"{requestUrl.Scheme}://{requestUrl.Host}" : "";
        var suppliers = await _repo.Query(p => p.BrandId == request.BrandId)
        .Include(p => p.ProductOffers).ThenInclude(po => po.Supplier)
         .GroupBy(p => p.ProductOffers.First().Supplier.Id)
             .Select(g => new UserDto
             {
                 Id = g.Key,
                 UserImage = $"{domainUrl}/{g.First().ProductOffers.First().Supplier.Image.TrimStart('/')}",
                 FullName = g.First().ProductOffers.First().Supplier.FullName,
                 PhoneNumber = g.First().ProductOffers.First().Supplier.PhoneNumber,
                 Email = g.First().ProductOffers.First().Supplier.Email,
                 UserDescription = g.First().ProductOffers.First().Supplier.UserDescription,

             })
            .ToListAsync(cancellationToken);

        return ServiceResult<IEnumerable<UserDto>>.Ok(suppliers);
    }

}