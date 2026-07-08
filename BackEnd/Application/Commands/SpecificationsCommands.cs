
using Common;
using MediatR;

public class CreateProductSpecificationCommand : SpecificationsDto, IRequest<ServiceResult<IdDto>>
{
 

}
public class UpdateProductSpecificationCommand : SpecificationsDto, IRequest<ServiceResult<IdDto>>
{
 
}

public class ActiveProductSpecificationCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
   
}
public class DeleteProductSpecificationCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }

}