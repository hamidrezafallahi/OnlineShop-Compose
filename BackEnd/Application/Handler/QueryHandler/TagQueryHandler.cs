using Application.Dtos;
using Application.Queries;
using Common;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

public class TagQueryHandler(ITagRepository _repo, IProductOfferTagRepository _productOfferRepository, IEntityConfigRepository _configRepo)
    : IRequestHandler<GetTagsQuery, ServiceResult<ListDto<TagDto>>>,
    IRequestHandler<GetTags4selectOptionQuery, ServiceResult<ListDto<SelectOptionDto>>>,
    IRequestHandler<GetTagBySlugQuery, ServiceResult<TagDto?>>,
    IRequestHandler<GetTagsByProductOfferIdQuery, ServiceResult<IEnumerable<TagDto>>>,
    IRequestHandler<GetAllTagIdsQuery, ServiceResult<List<IdDto>>>
{
     
    public async Task<ServiceResult<ListDto<TagDto>>> Handle(GetTagsQuery request,CancellationToken cancellationToken)
        {
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;
        IQueryable<Tag> query;
        if (request.Q is not null && request.Q.Length > 0)
        {
            if (!request.OnlyActives.HasValue || request.OnlyActives == false)
            {
                query = _repo.Query(b => b.Name.Contains(request.Q));
            }
            else
            {
                query = _repo.Query(b => b.IsActive && b.Name.Contains(request.Q));
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
        var pagedTags = await query
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync(cancellationToken);
        var dtos = pagedTags.Select(x => new TagDto
        {
            Id = x.Id,
            Name = x.Name,
            IsActive=x.IsActive
          
        }).ToList();



        dynamic? config = null;

        if (request.ByConfig == true)
        {
            config = await _configRepo.GetByEntityNameAsync("tags");
        }
        var resultDto = new ListDto<TagDto>
        {
            Records = dtos,
            ColumnsJson = config?.ColumnsJson,
            ActionsJson = config?.ActionsJson,
            TotalCount = totalCount,
            PageNumber = pageNumber,
            PageSize = pageSize,
        };

        return ServiceResult<ListDto<TagDto>>.Ok(resultDto);

     
        }
    public async Task<ServiceResult<ListDto<SelectOptionDto>>> Handle(GetTags4selectOptionQuery request, CancellationToken ct)
    {
        int pageNumber = request.page ?? 1;
        int pageSize = request.pageSize ?? 10;


        IQueryable<Tag> query;
        query = _repo.Query(c => c.IsActive);
        int totalCount = await query.CountAsync(c => c.IsActive);
        var pagedEntity = await query
    .Skip((pageNumber - 1) * pageSize).Take(pageSize)
            .ToListAsync(ct);
        var flatDtos = pagedEntity.Select(x => new SelectOptionDto
        {
            Id = x.Id,
            PersianLabel = x.Name,
            EnglishLabel = x.Name
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

    public async Task<ServiceResult<TagDto?>> Handle(GetTagBySlugQuery request, CancellationToken cancellationToken)
    {
        Tag? tag = null;
        if (int.TryParse(request.Slug, out int tagId))
        {
            tag = await _repo.Query(t => t.Id == tagId && !t.IsDeleted)
                             .FirstOrDefaultAsync(cancellationToken);
        }
        else
        {
            tag = await _repo.Query(t => t.Name == request.Slug && !t.IsDeleted)
                             .FirstOrDefaultAsync(cancellationToken);
        }

        if (tag == null)
            return ServiceResult<TagDto?>.Failed("Tag not found");

        var dto = new TagDto
        {
            Id = tag.Id,
            Name = tag.Name
        };

        return ServiceResult<TagDto?>.Ok(dto);
    }
    public async Task<ServiceResult<IEnumerable<TagDto>>> Handle(GetTagsByProductOfferIdQuery request, CancellationToken cancellationToken)
    {
        var productTags = await _productOfferRepository
            .Query(pt => pt.ProductOfferId == request.ProductId && !pt.IsDeleted)
            .Include(pt => pt.Tag) // برای گرفتن اطلاعات تگ
            .ToListAsync(cancellationToken);

        var dtos = productTags
            .Where(pt => pt.Tag != null && !pt.Tag.IsDeleted)
            .Select(pt => new TagDto
            {
                Id = pt.Tag.Id,
                Name = pt.Tag.Name
            }).ToList();

        return ServiceResult<IEnumerable<TagDto>>.Ok(dtos);
    }
    public async Task<ServiceResult<List<IdDto>>> Handle(GetAllTagIdsQuery request, CancellationToken cancellationToken)
    {
        var tags = await _repo
            .Query(t => !t.IsDeleted)
            .ToListAsync(cancellationToken);

        var dtos = tags.Select(t => new IdDto
        {
            Id = t.Id
        }).ToList();

        return ServiceResult<List<IdDto>>.Ok(dtos);
    }

}