using Common;
using MediatR;
using Microsoft.AspNetCore.Http;

namespace Application.Commands
{
    public class CreateSpecialOfferCommand : IRequest<ServiceResult<IdDto>>
    {
 
        public int ProductOfferId { get; set; }

        public int? DiscountId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int DisplayOrder { get; set; }

    }

    public class UpdateSpecialOfferCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public int ProductOfferId { get; set; }

        public int? DiscountId { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public int DisplayOrder { get; set; }

    }
    public class ActiveSpecialOfferCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteSpecialOfferCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }

    
}
