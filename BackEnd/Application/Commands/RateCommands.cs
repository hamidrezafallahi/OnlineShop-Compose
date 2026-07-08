using Common;
using Domain.Enums;
using MediatR;

namespace Application.Commands
{
    public class AddOrUpdateRateCommand : IRequest<ServiceResult<IdDto>>
    {
        public int? UserId { get; set; }

        public int TargetId { get; set; }
        public EnumTargetType TargetType { get; set; }
        public int Value { get; set; } // 1..5
    }
    public class ActiveRateCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteRateCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
