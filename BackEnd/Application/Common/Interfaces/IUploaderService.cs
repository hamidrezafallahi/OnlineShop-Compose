using Services.Services.Uploader.DTO;
namespace Application.Common.Interfaces
{
    public interface IUploaderService
    {
        Task<string> UploadAsWebp(UploadDTO Request);
        Task<string> UploadAsPng(UploadDTO Request);
        Task<string> UploadAsJpeg(UploadDTO Request);
        Task<string> UploadAsJpg(UploadDTO Request);
    }
}