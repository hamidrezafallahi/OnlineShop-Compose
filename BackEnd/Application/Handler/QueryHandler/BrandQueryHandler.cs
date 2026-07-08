using Application.Dtos;
using Application.Queries;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using System.Linq.Expressions;

namespace Application.Handler.QueryHandler
{
    public class BrandQueryHandler(IBrandRepository _repo, IHttpContextAccessor _accessor, IEntityConfigRepository _configRepo) : 
        IRequestHandler<GetAllBrandsQuery, ServiceResult<ListDto<BrandDto>>>,
        IRequestHandler<GetBrands4selectOptionQuery, ServiceResult<ListDto<SelectOptionDto>>>,
        IRequestHandler<GetBrandByIdQuery, ServiceResult<BrandDto?>>,
        IRequestHandler<GetAllBrandsIdQuery, ServiceResult<IEnumerable<IdDto>>>
    {
    
        public async Task<ServiceResult<ListDto<BrandDto>>> Handle(GetAllBrandsQuery request, CancellationToken cancellationToken)
        {
            int pageNumber = request.page ?? 1;
            int pageSize = request.pageSize ?? 10;
            IQueryable<Brand> query;
            if (request.Q is not null && request.Q.Length > 0)
            {
                if (!request.OnlyActives.HasValue || request.OnlyActives == false)
                {
                    query = _repo.Query(b => b.Description.Contains(request.Q) || b.Name.Contains(request.Q));
                }
                else
                {
                    query = _repo.Query(b => b.IsActive && (b.Description.Contains(request.Q) || b.Name.Contains(request.Q)));
                }
            }
            else
            {
                if (!request.OnlyActives.HasValue || request.OnlyActives == false)
                {

                    query = _repo.Query();
                }
                else
                {
                    query = _repo.Query(b => b.IsActive);
                }
            }
 
            int totalCount = await query.CountAsync(cancellationToken);
            var pagedBrands = await query
        .Skip((pageNumber - 1) * pageSize).Take(pageSize)
                .ToListAsync(cancellationToken);
            var req = _accessor.HttpContext?.Request;
            string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
            var brandsDto = pagedBrands.Select(br => new BrandDto
            {
                Id=br.Id,
                Description=br.Description,
                Name=br.Name,
                logoFile = !string.IsNullOrEmpty(br.LogoUrl)
                ? $"{domainUrl}/{br.LogoUrl.TrimStart('/')}"
                : null,
                IsActive=br.IsActive,
            }).ToList();

            dynamic? config = null;

            if (request.ByConfig == true)
            {
                config = await _configRepo.GetByEntityNameAsync("brands");
            }

            var resultDto = new ListDto<BrandDto>
            {
                Records = brandsDto,
                ColumnsJson = config?.ColumnsJson,
                ActionsJson = config?.ActionsJson,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize,
            };

            return ServiceResult<ListDto<BrandDto>>.Ok(resultDto);
        }
        public async Task<ServiceResult<ListDto<SelectOptionDto>>> Handle(GetBrands4selectOptionQuery request, CancellationToken cancellationToken)
        {
            int pageNumber = request.page ?? 1;
            int pageSize = request.pageSize ?? 10;
            IQueryable<Brand> query;
            query = _repo.Query(c => c.IsActive);
            int totalCount = await query.CountAsync(c => c.IsActive);
            var pagedBrands = await query
        .Skip((pageNumber - 1) * pageSize).Take(pageSize)
                .ToListAsync();
            var req = _accessor.HttpContext?.Request;
            string domainUrl = req != null ? $"{req.Scheme}://{req.Host}" : "";
            var flatDtos = pagedBrands.Select(c => new SelectOptionDto
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
        public async Task<ServiceResult<BrandDto?>> Handle(GetBrandByIdQuery request, CancellationToken cancellationToken)
        {
            var req = _accessor.HttpContext.Request;
            string domainUrl = $"{req.Scheme}://{req.Host}";
            var brand = _repo.Query(b => b.Id == request.Id && !b.IsDeleted)
                        .FirstOrDefault();
            if (brand == null)
                return ServiceResult<BrandDto?>.Failed("Brand not found");
            var brandDto = new BrandDto
            {
                Id = brand.Id,
                Name = brand.Name,
                IsActive = brand.IsActive,
                Description = brand.Description,
                logoFile = !string.IsNullOrEmpty(brand.LogoUrl)
                ? $"{domainUrl}/{brand.LogoUrl.TrimStart('/')}"
                : null
            };
            return ServiceResult<BrandDto?>.Ok(brandDto);
        }
        public async Task<ServiceResult<IEnumerable<IdDto>>> Handle(GetAllBrandsIdQuery request, CancellationToken cancellationToken)
        {
            var productIds = await _repo.GetAllIds();
            var idDtos = productIds.Select(p => new IdDto
            {
                Id = p
            }).ToList();

            return ServiceResult<IEnumerable<IdDto>>.Ok(idDtos);
        }
    }
 
    
}
