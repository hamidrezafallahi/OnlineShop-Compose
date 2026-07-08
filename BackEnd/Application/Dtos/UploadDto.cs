using Microsoft.AspNetCore.Http;
namespace Services.Services.Uploader.DTO
{
    public class UploadDTO
    {
        public string Path { get; set; }
        public IFormFile File { get; set; }
    }
    public class DeleteDTO
    {
        public string Path { get; set; }
        public string FileName { get; set; }
    }
}