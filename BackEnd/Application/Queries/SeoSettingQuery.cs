using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetSeoSettingsQuery : BaseListDto, IRequest<ServiceResult<ListDto<SeoSettingDto>>>
    {
    }

    public class GetSeoSettingByIdQuery : IRequest<ServiceResult<SeoSettingDto>>
    {
        public int Id { get; set; }
    }

    public class ResolveSeoSettingQuery : IRequest<ServiceResult<SeoResolvedDto>>
    {
        public string Path { get; set; } = string.Empty;
        public string Locale { get; set; } = "fa";
    }
}
