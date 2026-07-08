using Application.Dtos;
using Common;
using MediatR;
using OnlineShop.Domain.Entities;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateTagCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Name { get; set; }

    }
    public class UpdateTagCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

        public string Name { get; set; }

    }
    public class ActiveTagCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteTagCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }

    }
}
