using Application.Commands;
using Application.Common;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using Services.Services.Uploader.DTO;
public class CategoryCommandHandler(ICategoryRepository _repo, IHttpContextAccessor _accessor, IUploaderService _uploaderService) :
    IRequestHandler<CreateCategoryCommand, ServiceResult<IdDto>>,
            IRequestHandler<UpdateCategoryCommand, ServiceResult<IdDto>>,
    IRequestHandler<ActiveCategoryCommand, ServiceResult<IdDto>>,
    IRequestHandler<DeleteCategoryCommand, ServiceResult<IdDto>>
{

    public async Task<ServiceResult<IdDto>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var category = Category.Create(
             request.PersianName,
             request.CategoryPersianDesc,
             request.EnglishName,
             request.CategoryEnglishDesc,
             request.IsShowInLanding,
             request.IsActive,
            parentCategoryId: request.ParentCategoryId,
            currentUserId: userId.Value
        );

        await _repo.AddAsync(category);
        await _repo.SaveChangesAsync(cancellationToken);


        if (request.CategoryCover is not null)
        {
            var uploadDto = new UploadDTO
            {
                File = request.CategoryCover,
                Path = $"uploads/category/{category.Id}"
            };

            var thumbnailUrl = await _uploaderService.UploadAsWebp(uploadDto);

            category.Update(
persianName: null,
persianDesc: null,
englishName: null,
englishDesc: null,
imageUrl: thumbnailUrl,
showInLanding: null,
parentCategoryId: null,
currentUserId: userId.Value);

            await _repo.SaveChangesAsync(cancellationToken);
        }
        if (request.IsActive.HasValue)
        {
            category.SetActive(request.IsActive.Value, userId.Value);
        }
        await _repo.SaveChangesAsync(cancellationToken);
        return ServiceResult<IdDto>.Ok(new IdDto { Id = category.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var category = await _repo.GetByIdAsync(request.Id);
        if (category == null)
            return ServiceResult<IdDto>.Failed("این کتگوری موجود نیست.");

        string? thumbnailUrl = null;
        if (request.CategoryCover is not null)
        {
            if (!string.IsNullOrWhiteSpace(category.ImageUrl))
            {
                var fileNameOnly = Path.GetFileName(category.ImageUrl);
                await _uploaderService.DeleteFile(new DeleteDTO
                {
                    FileName = fileNameOnly,
                    Path = $"uploads/category/{category.Id}"
                });
            }
            var uploadDto = new UploadDTO
            {
                File = request.CategoryCover,
                Path = $"uploads/category/{category.Id}"
            };

            thumbnailUrl = await _uploaderService.UploadAsWebp(uploadDto);
        }

        category.Update(
            persianName: request.PersianName,
            persianDesc: request.CategoryPersianDesc,
            englishName: request.EnglishName,
            englishDesc: request.CategoryEnglishDesc,
            imageUrl: thumbnailUrl,
            showInLanding: request.IsShowInLanding,
            parentCategoryId: request.ParentCategoryId,
            currentUserId: userId.Value
        );


        if (request.IsActive.HasValue)
            category.SetActive(request.IsActive.Value, userId.Value);
        await _repo.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = category.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(ActiveCategoryCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var category = await _repo.GetByIdAsync(request.Id);
        if (category == null)
            return ServiceResult<IdDto>.Failed("این کتگوری موجود نیست.");
        category.SetActive(request.IsActive, userId.Value);
        await _repo.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = category.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");
        var category = await _repo.GetByIdAsync(request.Id);
        if (category == null)
            return ServiceResult<IdDto>.Failed("این کتگوری موجود نیست");
        var fileNameOnly = Path.GetFileName(category.ImageUrl);
        await _uploaderService.DeleteFile(new DeleteDTO
        {
            FileName = fileNameOnly,
            Path = $"uploads/category/{category.Id}"
        });
        category.Delete(userId.Value);

        await _repo.SaveChangesAsync(cancellationToken);
        return ServiceResult<IdDto>.Ok(new IdDto { Id = category.Id });

    }

}

