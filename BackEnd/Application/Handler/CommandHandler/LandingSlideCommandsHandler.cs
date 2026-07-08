using Application.Commands;
using Application.Common;
using Common;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using Services.Services.Uploader.DTO;

public class SlideCommandHandler(
        ISlideRepository _slideRepository,
        IHttpContextAccessor _accessor,
        IUploaderService _uploaderService) :
    IRequestHandler<CreateSlideCommand, ServiceResult<IdDto>>,
    IRequestHandler<UpdateSlideCommand, ServiceResult<IdDto>>,
    IRequestHandler<ActiveSlideCommand, ServiceResult<IdDto>>,
    IRequestHandler<DeleteSlideCommand, ServiceResult<IdDto>>,
    IRequestHandler<SetHeroBannerCommand, ServiceResult<IdDto>>

{

    public async Task<ServiceResult<IdDto>> Handle(CreateSlideCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var slide = Slide.Create(
            userId.Value,
            request.FirstUrl,
            request.SecondUrl,
            request.BannerTitle,
            request.BannerDescrioption


        );

        await _slideRepository.AddAsync(slide);
        await _slideRepository.SaveChangesAsync(cancellationToken);

        if (request.FirstUrl is not null)
        {
            var uploadDto = new UploadDTO
            {
                File = request.BannerUrl,
                Path = $"uploads/landingslide/{slide.Id}"
            };

            var BannerUrl = await _uploaderService.UploadAsWebp(uploadDto);
            slide.Update(userId.Value, BannerUrl, null, null, null, null);
            await _slideRepository.SaveChangesAsync(cancellationToken);
        }
        await _slideRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = slide.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(UpdateSlideCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var slide = await _slideRepository.GetByIdAsync(request.Id);
        if (slide == null)
            return ServiceResult<IdDto>.Failed("slide پیدا نشد");

        string? bannerUrl = null;
        if (request.BannerUrl is not null)
        {

            var fileNameOnly = Path.GetFileName(slide.BannerUrl);
            await _uploaderService.DeleteFile(new DeleteDTO
            {
                FileName = fileNameOnly,
                Path = $"uploads/landingslide/{slide.Id}"
            });
            var uploadDto = new UploadDTO
            {
                File = request.BannerUrl,
                Path = $"uploads/landingslide/{slide.Id}"
            };

            bannerUrl = await _uploaderService.UploadAsWebp(uploadDto);
        }

        slide.Update(
         userId.Value,
         bannerUrl,
         request.FirstUrl,
         request.SecondUrl,
         request.BannerTitle,
         request.BannerDescrioption
        );
        await _slideRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = slide.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(ActiveSlideCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var slide = await _slideRepository.GetByIdAsync(request.Id);
        if (slide == null)
            return ServiceResult<IdDto>.Failed("اسلاید پیدا نشد");
        slide.SetActive(request.IsActive, userId.Value);
        await _slideRepository.SaveChangesAsync(cancellationToken);
        return ServiceResult<IdDto>.Ok(new IdDto { Id = slide.Id });
    }

    public async Task<ServiceResult<IdDto>> Handle(DeleteSlideCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var slide = await _slideRepository.GetByIdAsync(request.Id);
        if (slide == null)
            return ServiceResult<IdDto>.Failed("بلاگ پیدا نشد");
        var fileNameOnly = Path.GetFileName(slide.BannerUrl);
        await _uploaderService.DeleteFile(new DeleteDTO
        {
            FileName = fileNameOnly,
            Path = $"uploads/landingslide/{slide.Id}"
        });
        slide.Delete(userId.Value);
        await _slideRepository.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = slide.Id });
    }
    public async Task<ServiceResult<IdDto>> Handle(SetHeroBannerCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        var slides = await _slideRepository.Query(s => s.IsActive).ToListAsync();
        if (!slides.Any())
            return ServiceResult<IdDto>.Failed("اسلایدی یافت نشد");

        // همه رو غیرفعال می‌کنیم
        foreach (var slide in slides)
        {
            slide.SetHero(slide.Id == request.Id, userId.Value);
        }

        await _slideRepository.SaveChangesAsync(cancellationToken);
        return ServiceResult<IdDto>.Ok(new IdDto { Id = request.Id });
    }

}


