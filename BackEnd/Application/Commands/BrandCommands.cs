using Application.Dtos;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateBrandCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Name { get; set; } = default!;
        public IFormFile? LogoFile { get; set; }
        public string Description { get; set; } = default!;
        public bool? IsActive { get; set; }

    }
    public class UpdateBrandCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? Name { get; set; } = default!;
        public bool? IsActive { get; set; }
        public IFormFile? LogoFile { get; set; }
        public string? Description { get; set; } = default!;

    }
    public class DeleteBrandCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

    }
    public class ActiveBrandCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
}
