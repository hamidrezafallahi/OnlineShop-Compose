using Common;
using MediatR;
using Microsoft.AspNetCore.Http;


namespace Application.Commands
{
    public class CreateSlideCommand : IRequest<ServiceResult<IdDto>>
    {
 
        public IFormFile BannerUrl { get; set; }
        public string BannerTitle { get;  set; } 
        public string BannerDescrioption { get;  set; }
        public string FirstUrl { get;  set; }
        public string SecondUrl { get;  set; }


    }

    public class UpdateSlideCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public IFormFile? BannerUrl { get; set; }
        public string? BannerTitle { get; set; }
        public string? BannerDescrioption { get;  set; }
        public string? FirstUrl { get;  set; }
        public string? SecondUrl { get;  set; }

    }

    public class DeleteSlideCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }

    public class ActiveSlideCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class SetHeroBannerCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
