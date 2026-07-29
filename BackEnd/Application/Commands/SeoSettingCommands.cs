using Common;
using MediatR;

namespace Application.Commands
{
    public class CreateSeoSettingCommand : IRequest<ServiceResult<IdDto>>
    {
        public string RoutePath { get; set; } = string.Empty;
        public string MatchType { get; set; } = "exact";
        public string? TitleFa { get; set; }
        public string? TitleEn { get; set; }
        public string? DescriptionFa { get; set; }
        public string? DescriptionEn { get; set; }
        public string? KeywordsFa { get; set; }
        public string? KeywordsEn { get; set; }
        public string? CanonicalPath { get; set; }
        public string? OgImageUrl { get; set; }
        public bool RobotsIndex { get; set; } = true;
        public bool RobotsFollow { get; set; } = true;
        public int Priority { get; set; }
        public string? Notes { get; set; }
    }

    public class UpdateSeoSettingCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? RoutePath { get; set; }
        public string? MatchType { get; set; }
        public string? TitleFa { get; set; }
        public string? TitleEn { get; set; }
        public string? DescriptionFa { get; set; }
        public string? DescriptionEn { get; set; }
        public string? KeywordsFa { get; set; }
        public string? KeywordsEn { get; set; }
        public string? CanonicalPath { get; set; }
        public string? OgImageUrl { get; set; }
        public bool? RobotsIndex { get; set; }
        public bool? RobotsFollow { get; set; }
        public int? Priority { get; set; }
        public string? Notes { get; set; }
        public bool? IsActive { get; set; }
    }

    public class ActiveSeoSettingCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }

    public class DeleteSeoSettingCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
