using Application.Dtos;
using Common;
using MediatR;

namespace Application.Commands;

public class ValidateBlogContentCommand : IRequest<ServiceResult<BlogContentQualityResultDto>>
{
    public BlogContentQualityRequestDto Payload { get; set; } = new();
}
