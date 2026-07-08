using Common;
using MediatR;
using System.Text.Json.Serialization;

namespace Application.Commands
{
    public class CreateShippingMethodCommand :  IRequest<ServiceResult<IdDto>>
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDeliveryTime { get; set; }
        public bool? IsDefault { get; set; }=false;

    }

    public class UpdateShippingMethodCommand :  IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? EstimatedDeliveryTime { get; set; }
        public bool? IsDefault { get; set; } = false;

    }
    public class ActiveShippingMethodCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteShippingMethodCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
    public class SetDefaultShippingMethodCommand : IRequest<ServiceResult<IdDto>>
    {
        public int ShippingMethodId { get; set; }
    }

}

