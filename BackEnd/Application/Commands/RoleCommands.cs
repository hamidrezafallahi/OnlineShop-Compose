using Common;
using Domain.Enums;
using MediatR;

namespace Application.Commands
{
 
    public class ActiveRoleCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteRoleCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
