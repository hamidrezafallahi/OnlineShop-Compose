using Services.Services.Uploader.DTO;

namespace Application.Common.Interfaces
{
    public interface IUploaderService
    {
        /// <summary>Returns relative path like uploads/brands/1/guid_name.webp, or null on failure.</summary>
        Task<string?> UploadAsWebp(UploadDTO request);
        Task<string?> UploadAsPng(UploadDTO request);
        Task<string?> UploadAsJpeg(UploadDTO request);
        Task<string?> UploadAsJpg(UploadDTO request);

        Task DeleteFile(DeleteDTO request);

        /// <summary>
        /// Deletes a previously stored media file using its DB path.
        /// Falls back to <paramref name="fallbackDirectory"/> when the path is flat/legacy.
        /// </summary>
        Task DeleteStoredFile(string? storedPath, string fallbackDirectory);
    }
}
