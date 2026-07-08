using Application.Dtos;
using Common;
using MediatR;
using OnlineShop.Domain.Entities;
using System.Collections.Generic;

namespace Application.Queries
{
    public class GetAllDiscountsQuery : BaseListDto, IRequest<ServiceResult<ListDto<DiscountDto>>>
    {}
    public class GetDiscountByIdQuery : IRequest<ServiceResult<DiscountDto?>>
    {
        public int Id { get; set; }
    }
    public class GetDiscounts4selectOptionQuery : BaseListDto, IRequest<ServiceResult<ListDto<SelectOptionDto>>> { }

    public class GetActiveDiscountsQuery : IRequest<ServiceResult<IEnumerable<DiscountDto>>>
    {

    }

    public class IsDiscountValidQuery : IRequest<ServiceResult<ValidDiscountDto?>>
    {
        public int DiscountId { get; set; }

    }

    public class GetDiscountByProductOfferIdQuery : IRequest<ServiceResult<Discount?>>
    {
        public int ProductId { get; set; }

     
    }
}
