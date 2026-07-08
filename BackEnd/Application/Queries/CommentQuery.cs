using Application.Dtos;
using Common;
using Domain.Enums;
using MediatR;

namespace Application.Queries
{
    public class GetAllCommentsQuery : BaseListDto, IRequest<ServiceResult<ListDto<CommentDto>>>
    {
        public bool OnlyApproved { get; set; } = false;

    }
    public class GetCommentsByTargetQuery : IRequest<ServiceResult<List<CommentDto>>>
    {
        public EnumTargetType TargetType { get; set; }
        public int TargetId { get; set; }

        public bool OnlyApproved { get; set; } = true;
        public string? Q { get; set; }
        public int? Limit { get; set; } = 5;

    }
    public class GetCommentByIdQuery : IRequest<ServiceResult<CommentDto?>>
    {
        public int Id { get; set; }
    }
}
