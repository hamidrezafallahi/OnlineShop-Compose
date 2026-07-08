using Common;
using MediatR;

namespace Application.Commands
{
    public class CreatePaymentMethodCommand : IRequest<ServiceResult<IdDto>>
    {
        public string Title { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsOnline { get; set; }
        public string? ConfigJson { get; set; }
        public int DisplayOrder { get; set; }
    }
    public class UpdatePaymentMethodCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Code { get; set; }
        public bool? IsOnline { get; set; }
        public string? ConfigJson { get; set; }
        public int? DisplayOrder { get; set; }
        public bool? IsActive { get; set; }
    }
    public class ActivePaymentMethodCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeletePaymentMethodCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
