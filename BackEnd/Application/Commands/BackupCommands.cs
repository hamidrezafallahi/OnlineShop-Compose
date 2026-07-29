using Application.Dtos;
using Common;
using MediatR;

namespace Application.Commands
{
    public class CreateBackupCommand : IRequest<ServiceResult<BackupFileDto>>
    {
    }

    public class DeleteBackupCommand : IRequest<ServiceResult<BackupFileDto>>
    {
        public string FileName { get; set; } = string.Empty;
    }
}
