using Common;
using MediatR;

public class CreateUserTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int UserId { get; set; }
    public int TagId { get; set; }
}

public class UpdateUserTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int TagId { get; set; }
}

public class ActiveUserTagCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
public class DeleteUserTagCommand : IRequest<ServiceResult<IdDto>>
{
    public int Id { get; set; }

}