using Common;
using MediatR;

public class CreateBlogTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int BlogId { get; set; }
    public int TagId { get; set; }
}

public class UpdateBlogTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
    public int BlogId { get; set; }
    public int TagId { get; set; }
}

public class ActiveBlogTagCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
public class DeleteBlogTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }

}