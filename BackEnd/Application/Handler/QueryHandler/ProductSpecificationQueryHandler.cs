using Application.Dtos;
using Application.Queries;
using Common;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using System;
public class ProductSpecificationQueryHandler(
            IProductSpecificationRepository _repo,
            IEntityConfigRepository _configRepo) :
        IRequestHandler<GetProductSpecificationsQuery, ServiceResult<ListDto<SpecificationsDto>>>,
         IRequestHandler<GetProductSpecificationByIdQuery, ServiceResult<SpecificationsDto?>>
{
    public async Task<ServiceResult<ListDto<SpecificationsDto>>> Handle(GetProductSpecificationsQuery request, CancellationToken cancellationToken)
    {
     
        var now = DateTime.UtcNow;
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;
        IQueryable<ProductSpecification> query;
        if (request.Q is not null && request.Q.Length > 0)
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {
                query = _repo.Query(x => x.Key.Contains(request.Q) || x.Value.Contains(request.Q)).Include(x => x.Product).OrderByDescending(x => x.CreatedAt);
            }
            else
            {
                query = _repo.Query(x => x.IsActive && (x.Key.Contains(request.Q) || x.Value.Contains(request.Q))).Include(x => x.Product).OrderByDescending(x => x.CreatedAt);
            }
        }
        else
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {

                query = _repo.Query().Include(x => x.Product).OrderByDescending(x => x.CreatedAt);

                //.OrderBy(s => s.DisplayOrder)
                //.ThenByDescending(s => s.EndDate);
            }
            else
            {
                query = _repo.Query(s => s.IsActive).Include(x=>x.Product).OrderByDescending(x => x.CreatedAt);

            }
        }
      

        int totalCount = await query.CountAsync(cancellationToken);

        var pagedEntity = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);

        var Dtos = pagedEntity.Select(x => new SpecificationsDto

        {
            Id = x.Id,
            IsActive = x.IsActive,
            Key = x.Key,
            ProductId = x.ProductId,
            ProductName = x.Product.Name,
            Value = x.Value 
        })
        .ToList();

        dynamic? config = null;
        if (request.ByConfig == true)
        {
            config = await _configRepo.GetByEntityNameAsync("specifications");
        }

        var resultDto = new ListDto<SpecificationsDto>
        {
            Records = Dtos,
            ColumnsJson = config?.ColumnsJson,
            ActionsJson = config?.ActionsJson,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

        return ServiceResult<ListDto<SpecificationsDto>>.Ok(resultDto);
    }

    public async Task<ServiceResult<SpecificationsDto?>> Handle(GetProductSpecificationByIdQuery request, CancellationToken cancellationToken)
    {
        var now = DateTime.UtcNow;
        var special = await _repo.Query(x => x.Id == request.Id && x.IsActive).FirstOrDefaultAsync(cancellationToken);
        if (special == null)
            return ServiceResult<SpecificationsDto?>.Failed("مشخصات محصول یافت نشد");
 
        var Dto = new SpecificationsDto
        {
            Id = special.Id,
            IsActive = special.IsActive,
            Key = special.Key,
            ProductId = special.ProductId,
            Value = special.Value

        };
        return ServiceResult<SpecificationsDto?>.Ok(Dto);
    }

}

