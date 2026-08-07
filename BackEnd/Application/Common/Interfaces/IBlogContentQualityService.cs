using Application.Dtos;

namespace Application.Common.Interfaces;

public interface IBlogContentQualityService
{
    Task<BlogContentQualityResultDto> ValidateAsync(
        BlogContentQualityRequestDto request,
        CancellationToken cancellationToken = default);
}
