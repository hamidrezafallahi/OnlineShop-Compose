using Application.Dtos;

namespace Application.Interfaces
{
    public interface IBackupService
    {
        Task<BackupFileDto> CreateAsync(CancellationToken cancellationToken = default);
        Task<IReadOnlyList<BackupFileDto>> ListAsync(CancellationToken cancellationToken = default);
        Task<(Stream Stream, string ContentType, string FileName)?> OpenDownloadAsync(
            string fileName,
            CancellationToken cancellationToken = default);
        Task<bool> DeleteAsync(string fileName, CancellationToken cancellationToken = default);
    }
}
