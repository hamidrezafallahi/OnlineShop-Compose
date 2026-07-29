using Application.Commands;
using Application.Dtos;
using Application.Interfaces;
using Common;
using MediatR;

namespace Application.Handler.CommandHandler
{
    public class BackupCommandHandlers(IBackupService backupService) :
        IRequestHandler<CreateBackupCommand, ServiceResult<BackupFileDto>>,
        IRequestHandler<DeleteBackupCommand, ServiceResult<BackupFileDto>>
    {
        public async Task<ServiceResult<BackupFileDto>> Handle(
            CreateBackupCommand request,
            CancellationToken cancellationToken)
        {
            try
            {
                var file = await backupService.CreateAsync(cancellationToken);
                return ServiceResult<BackupFileDto>.Ok(file);
            }
            catch (Exception ex)
            {
                return ServiceResult<BackupFileDto>.Failed(ex.Message);
            }
        }

        public async Task<ServiceResult<BackupFileDto>> Handle(
            DeleteBackupCommand request,
            CancellationToken cancellationToken)
        {
            try
            {
                var deleted = await backupService.DeleteAsync(request.FileName, cancellationToken);
                if (!deleted)
                    return ServiceResult<BackupFileDto>.Failed("Backup file not found");

                return ServiceResult<BackupFileDto>.Ok(new BackupFileDto
                {
                    FileName = request.FileName,
                });
            }
            catch (Exception ex)
            {
                return ServiceResult<BackupFileDto>.Failed(ex.Message);
            }
        }
    }
}
