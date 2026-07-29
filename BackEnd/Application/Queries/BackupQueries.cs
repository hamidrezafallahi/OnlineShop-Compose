using Application.Dtos;
using Common;
using MediatR;

namespace Application.Queries
{
    public class GetBackupsQuery : IRequest<ServiceResult<BackupListDto>>
    {
    }
}
