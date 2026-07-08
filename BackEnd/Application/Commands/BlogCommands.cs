using Application.Dtos;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands
{
    public class CreateBlogCommand : IRequest<ServiceResult<IdDto>>
    {
        public string TitleFa { get; set; } = string.Empty;
        public string IntroFa { get; set; } = string.Empty;
        public string ContentFa { get; set; } = string.Empty;
        public string ConclusionFa { get; set; } = string.Empty;

        public string? ExcerptFa { get; set; }
        public string? MetaDescriptionFa { get; set; }
        public string? MetaKeywordsFa { get; set; }

        public string TitleEn { get; set; } = string.Empty;
        public string IntroEn { get; set; } = string.Empty;

        public string ContentEn { get; set; } = string.Empty;
        public string ConclusionEn { get; set; } = string.Empty;

        public string? ExcerptEn { get; set; }
        public string? MetaDescriptionEn { get; set; }
        public string? MetaKeywordsEn { get; set; }

        public string? Slug { get; set; }
        public IFormFile? ThumbnailFile { get; set; }
        public int? AuthorId { get; set; }
 
    }

    public class UpdateBlogCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? TitleFa { get; set; } = string.Empty;
        public string? IntroFa { get; set; } = string.Empty;
        public string? ContentFa { get; set; } = string.Empty;
        public string? ConclusionFa { get; set; } = string.Empty;

        public string? ExcerptFa { get; set; }
        public string? MetaDescriptionFa { get; set; }
        public string? MetaKeywordsFa { get; set; }

        public string? TitleEn { get; set; } = string.Empty;
        public string? IntroEn { get; set; } = string.Empty;

        public string? ContentEn { get; set; } = string.Empty;
        public string? ConclusionEn { get; set; } = string.Empty;

        public string? ExcerptEn { get; set; }
        public string? MetaDescriptionEn { get; set; }
        public string? MetaKeywordsEn { get; set; }

        public string? Slug { get; set; }
        public IFormFile? ThumbnailFile { get; set; }
        public int? AuthorId { get; set; }
    }

    public class DeleteBlogCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }

    public class ActiveBlogCommand : ActiveCommand, IRequest<ServiceResult<IdDto>>{}
}
