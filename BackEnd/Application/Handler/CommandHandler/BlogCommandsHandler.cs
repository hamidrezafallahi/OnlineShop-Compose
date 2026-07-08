using Application.Commands;
using Application.Common;
using Application.Common.Interfaces;
using Application.Dtos;
using Common;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using OnlineShop.Domain.Entities;
using Services.Services.Uploader.DTO;
public class BlogCommandHandler(
            IBlogRepository _blogRepository,
            IHttpContextAccessor _accessor,
            IUploaderService _uploaderService) :
        IRequestHandler<CreateBlogCommand, ServiceResult<IdDto>>,
        IRequestHandler<UpdateBlogCommand, ServiceResult<IdDto>>,
        IRequestHandler<DeleteBlogCommand, ServiceResult<IdDto>>,
        IRequestHandler<ActiveBlogCommand, ServiceResult<IdDto>>
{
    public async Task<ServiceResult<IdDto>> Handle(CreateBlogCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        var actor = _accessor.HttpContext.GetRole();

        if (userId == null)
            
            return ServiceResult<IdDto>.Failed("Unauthorized");
        var blog = Blog.Create(
             titleFa: request.TitleFa.Trim(),
             introFa: request.IntroFa,
             contentFa: request.ContentFa,
             conclusionFa: request.ConclusionFa,
             excerptFa: request.ExcerptFa,
             metaDescriptionFa: request.MetaDescriptionFa,
             metaKeywordsFa: request.MetaKeywordsFa,
             titleEn: request.TitleFa.Trim(),
             introEn: request.ContentFa,
             contentEn: request.ContentFa,
             conclusionEn: request.ContentFa,
             excerptEn: request.ExcerptEn,
             metaDescriptionEn: request.MetaDescriptionEn,
             metaKeywordsEn: request.MetaKeywordsEn,
             slug: request.Slug,
             thumbnailFile:null,
             authorId: request.AuthorId ?? userId.Value,
             currentUserId: userId.Value
             );
        try
        {
            await _blogRepository.AddAsync(blog);
            await _blogRepository.SaveChangesAsync(cancellationToken);
        }
        catch (Exception ex)
        {
            return ServiceResult<IdDto>.Failed($"خطا: {ex.Message}");
        }

        if (request.ThumbnailFile is not null)
        {
            var uploadDto = new UploadDTO
            {
                File = request.ThumbnailFile,
                Path = $"uploads/blogs/{blog.Id}"
            };

            var thumbnailUrl = await _uploaderService.UploadAsWebp(uploadDto);

            blog.UpdateFile(currentUserId: userId.Value, thumbnailFile: thumbnailUrl);

        }

        await _blogRepository.SaveChangesAsync(cancellationToken);
        return ServiceResult<IdDto>.Ok(new IdDto { Id = blog.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(UpdateBlogCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        var actor = _accessor.HttpContext.GetRole();

        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var blog = await _blogRepository.GetByIdAsync(request.Id);
        if (blog == null)
            return ServiceResult<IdDto>.Failed("بلاگ پیدا نشد");

        string? thumbnailUrl = null;
        if (request.ThumbnailFile is not null)
        {
            var uploadDto = new UploadDTO
            {
                File = request.ThumbnailFile,
                Path = $"uploads/blogs/{blog.Id}"
            };
            var fileNameOnly = Path.GetFileName(blog.ThumbnailFile);
            await _uploaderService.DeleteFile(new DeleteDTO
            {
                FileName = fileNameOnly,
                Path = $"uploads/blogs/{blog.Id}"
            });

            thumbnailUrl = await _uploaderService.UploadAsWebp(uploadDto);
        }

            

        blog.Update(
            currentUserId: userId.Value,
            titleFa: string.IsNullOrWhiteSpace(request.TitleFa) ? null : request.TitleFa,
            introFa: string.IsNullOrWhiteSpace(request.IntroFa) ? null : request.IntroFa,
            contentFa: string.IsNullOrWhiteSpace(request.ContentFa) ? null : request.ContentFa,
            conclusionFa: string.IsNullOrWhiteSpace(request.ConclusionFa) ? null : request.ConclusionFa,
            excerptFa: string.IsNullOrWhiteSpace(request.ExcerptFa) ? null : request.ExcerptFa,
            metaDescriptionFa: string.IsNullOrWhiteSpace(request.MetaDescriptionFa) ? null : request.MetaDescriptionFa,
            metaKeywordsFa: string.IsNullOrWhiteSpace(request.MetaKeywordsFa) ? null : request.MetaKeywordsFa,
            titleEn: string.IsNullOrWhiteSpace(request.TitleEn) ? null : request.TitleEn,
            introEn: string.IsNullOrWhiteSpace(request.IntroEn) ? null : request.IntroEn,
            contentEn: string.IsNullOrWhiteSpace(request.ContentEn) ? null : request.ContentEn,
            conclusionEn: string.IsNullOrWhiteSpace(request.ConclusionEn) ? null : request.ConclusionEn,
            excerptEn: string.IsNullOrWhiteSpace(request.ExcerptEn) ? null : request.ExcerptEn,
            metaDescriptionEn: string.IsNullOrWhiteSpace(request.MetaDescriptionEn) ? null : request.MetaDescriptionEn,
            metaKeywordsEn: string.IsNullOrWhiteSpace(request.MetaKeywordsEn) ? null : request.MetaKeywordsEn,
            slug: string.IsNullOrWhiteSpace(request.Slug) ? null : request.Slug,
            thumbnailFile: string.IsNullOrWhiteSpace(thumbnailUrl) ? null : thumbnailUrl,
            authorId: request.AuthorId ?? null 
            );

        await _blogRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = blog.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(DeleteBlogCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var blog = await _blogRepository.GetByIdAsync(request.Id);
        if (blog == null)
            return ServiceResult<IdDto>.Failed("بلاگ پیدا نشد");
        var fileNameOnly = Path.GetFileName(blog.ThumbnailFile);
        await _uploaderService.DeleteFile(new DeleteDTO
        {
            FileName = fileNameOnly,
            Path = $"uploads/blogs/{blog.Id}"
        });
        blog.Delete(userId.Value);
        await _blogRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = blog.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(ActiveBlogCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var blog = await _blogRepository.GetByIdAsync(request.Id);
        if (blog == null)
            return ServiceResult<IdDto>.Failed("بلاگ پیدا نشد");

        blog.SetActive(request.IsActive, userId.Value);

        await _blogRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = blog.Id });
    }

}
