using Application.Dtos;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
 

namespace Application.Commands
{
    public class CreateCategoryCommand : IRequest<ServiceResult<IdDto>>
    {
 
        public string PersianName { get; set; } 
        public string EnglishName { get; set; } 
        public IFormFile CategoryCover { get; set; }  
        public string CategoryPersianDesc { get; set; }
        public string CategoryEnglishDesc { get; set; }
        public bool IsShowInLanding { get; set; }
        public bool? IsActive { get; set; }

        public int? ParentCategoryId { get; set; }


    }

    public class UpdateCategoryCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string PersianName { get; set; }
        public string EnglishName { get; set; }
        public IFormFile? CategoryCover { get; set; }
        public string CategoryPersianDesc { get; set; }
        public string CategoryEnglishDesc { get; set; }
        public bool IsShowInLanding { get; set; }
        public bool? IsActive { get; set; }

        public int? ParentCategoryId { get; set; }
        public List<CategoryDto>? SubCategories { get; set; }


    }
    public class ActiveCategoryCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteCategoryCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

    }
}
