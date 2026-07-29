using Application.Dtos;
using Application.Interfaces;
using Application.Queries;
using Common;
using MediatR;

namespace Application.Handler.QueryHandler
{
    public class BackupQueryHandler(IBackupService backupService)
        : IRequestHandler<GetBackupsQuery, ServiceResult<BackupListDto>>
    {
        public async Task<ServiceResult<BackupListDto>> Handle(
            GetBackupsQuery request,
            CancellationToken cancellationToken)
        {
            var items = await backupService.ListAsync(cancellationToken);
            return ServiceResult<BackupListDto>.Ok(new BackupListDto
            {
                Items = items.ToList(),
                TotalCount = items.Count,
            });
        }
    }
}
