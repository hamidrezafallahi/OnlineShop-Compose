using Common;
using MediatR;
using System.Text.Json.Serialization;

public class CreateProductOfferTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int ProductOfferId { get; set; }
    public int TagId { get; set; }
}

public class UpdateProductOfferTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
    public int ProductOfferId { get; set; }
    public int TagId { get; set; }
}

public class ActiveProductOfferTagCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
public class DeleteProductOfferTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }

}