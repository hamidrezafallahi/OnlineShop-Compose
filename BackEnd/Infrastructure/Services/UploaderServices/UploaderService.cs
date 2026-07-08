
using Microsoft.AspNetCore.Hosting;
using Services.Services.Uploader.DTO;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Formats.Webp;


namespace Services.Services.Uploader
{
    public class UploaderService : IUploaderService
    {
        private readonly IWebHostEnvironment _WebHost;
        //supported types you can add more here...

        private string[] supportedTypes = new[] { "jpg", "jpeg", "png", "webp" };

        public UploaderService(IWebHostEnvironment webHostEnvironment)
        {
            _WebHost = webHostEnvironment;
        }

        /// <summary>
        /// upload as jpg
        /// </summary>
        /// <param name="Request"></param>
        /// <returns></returns>
        public async Task<string> UploadAsJpg(UploadDTO Request)
        {
            var wwwrootPath = _WebHost.WebRootPath;

            //check if null create
            if (string.IsNullOrWhiteSpace(wwwrootPath))
            {
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            //get root 
            var rootpath = Path.Combine(wwwrootPath, Request.Path);

            if (!Directory.Exists(rootpath))
                Directory.CreateDirectory(rootpath);

            //check file is not empty
            if (Request.File == null || Request.File.Length == 0)
                return null;

            //make new file name
            var fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileNameWithoutExtension(Request.File.FileName) +
                           ".jpg";


            //final path file 
            var systemfilepath = Path.Combine(rootpath, fileName);


            //check for supported ext
            var fileExt = System.IO.Path.GetExtension(fileName).Substring(1);
            if (!supportedTypes.Contains(fileExt))
            {
                var ErrorMessage = "File Extension Is InValid - Only Upload IMAGE/VIDEO File";
                return ErrorMessage;
            }
            else
            {
                using (FileStream fs = new(systemfilepath, FileMode.Create))
                {
                    using (Image Image = Image.Load(Request.File.OpenReadStream()))
                    {
                        await Image.SaveAsync(fs, new PngEncoder());
                    }
                }

                return $"{Request.Path}/{fileName}";
            }
        }

        /// <summary>
        /// upload as jpeg
        /// </summary>
        /// <param name="Request"></param>
        /// <returns></returns>
        public async Task<string> UploadAsJpeg(UploadDTO Request)
        {
            var wwwrootPath = _WebHost.WebRootPath;

            //check if null create
            if (string.IsNullOrWhiteSpace(wwwrootPath))
            {
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            //get root 
            var rootpath = Path.Combine(wwwrootPath, Request.Path);

            if (!Directory.Exists(rootpath))
                Directory.CreateDirectory(rootpath);

            //check file is not empty
            if (Request.File == null || Request.File.Length == 0)
                return null;

            //make new file name
            var fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileNameWithoutExtension(Request.File.FileName) +
                           ".jpeg";


            //final path file 
            var systemfilepath = Path.Combine(rootpath, fileName);


            //check for supported ext
            var fileExt = System.IO.Path.GetExtension(fileName).Substring(1);
            if (!supportedTypes.Contains(fileExt))
            {
                var ErrorMessage = "File Extension Is InValid - Only Upload IMAGE/VIDEO File";
                return ErrorMessage;
            }
            else
            {
                using (FileStream fs = new(systemfilepath, FileMode.Create))
                {
                    using (Image Image = Image.Load(Request.File.OpenReadStream()))
                    {
                        await Image.SaveAsync(fs, new PngEncoder());
                    }
                }

                return $"{Request.Path}/{fileName}";
            }
        }

        /// <summary>
        /// upload as png
        /// </summary>
        /// <param name="Request"></param>
        /// <returns></returns>
        public async Task<string> UploadAsPng(UploadDTO Request)
        {
            var wwwrootPath = _WebHost.WebRootPath;

            //check if null create
            if (string.IsNullOrWhiteSpace(wwwrootPath))
            {
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            //get root 
            var rootpath = Path.Combine(wwwrootPath, Request.Path);

            if (!Directory.Exists(rootpath))
                Directory.CreateDirectory(rootpath);

            //check file is not empty
            if (Request.File == null || Request.File.Length == 0)
                return null;

            //make new file name
            var fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileNameWithoutExtension(Request.File.FileName) +
                           ".png";


            //final path file 
            var systemfilepath = Path.Combine(rootpath, fileName);


            //check for supported ext
            var fileExt = System.IO.Path.GetExtension(fileName).Substring(1);
            if (!supportedTypes.Contains(fileExt))
            {
                var ErrorMessage = "File Extension Is InValid - Only Upload IMAGE/VIDEO File";
                return ErrorMessage;
            }
            else
            {
                using (FileStream fs = new(systemfilepath, FileMode.Create))
                {
                    using (Image Image = Image.Load(Request.File.OpenReadStream()))
                    {
                        await Image.SaveAsync(fs, new PngEncoder());
                    }
                }

                return $"{Request.Path}/{fileName}";
            }
        }


        /// <summary>
        /// upload with webp
        /// </summary>
        /// <param name="Request"></param>
        /// <returns></returns>
        public async Task<string> UploadAsWebp(UploadDTO Request)
        {
            var wwwrootPath = _WebHost.WebRootPath;

            //check if null create
            if (string.IsNullOrWhiteSpace(wwwrootPath))
            {
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            }

            //get root 
            var rootpath = Path.Combine(wwwrootPath, Request.Path);

            if (!Directory.Exists(rootpath))
                Directory.CreateDirectory(rootpath);

            //check file is not empty
            if (Request.File == null || Request.File.Length == 0)
                return null;

            //make new file name
            var fileName = Guid.NewGuid().ToString() + "_" + Path.GetFileNameWithoutExtension(Request.File.FileName) +
                           ".webp";
            var systemfilepath = Path.Combine(rootpath, fileName);
            var fileExt = System.IO.Path.GetExtension(fileName).Substring(1);
            if (!supportedTypes.Contains(fileExt))
        return "File Extension Is InValid - Only Upload IMAGE/VIDEO File";

    using (var ms = new MemoryStream())
    {
        await Request.File.CopyToAsync(ms);
        ms.Position = 0; 

        using (var image = Image.Load(ms))
        using (var fs = new FileStream(systemfilepath, FileMode.Create, FileAccess.Write, FileShare.None))
        {
            await image.SaveAsync(fs, new WebpEncoder
            {
                Quality = 70,
                FileFormat = WebpFileFormatType.Lossy,
            });
        }
    }

    return $"{Request.Path}/{fileName}";
            }

        public async Task<string> DeleteFile(DeleteDTO Request)
        {
            var wwwrootPath = _WebHost.WebRootPath;

            // اگر WebRootPath مقدار نداشت
            if (string.IsNullOrWhiteSpace(wwwrootPath))
                wwwrootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");

            // مسیر فولدر مقصد
            var rootpath = Path.Combine(wwwrootPath, Request.Path);

            if (!Directory.Exists(rootpath))
                return "Directory not found";

            if (string.IsNullOrWhiteSpace(Request.FileName))
                return "FileName is null or empty";

            // اسم فایل بدون پسوند
            var fileNameWithoutExt = Path.GetFileNameWithoutExtension(Request.FileName);

            // همه فایل‌های داخل مسیر را بررسی می‌کنیم
            var files = Directory.GetFiles(rootpath);

            // فایل موردنظر را صرف‌نظر از پسوند پیدا می‌کنیم
            var targetFile = files.FirstOrDefault(f =>
                Path.GetFileNameWithoutExtension(f).Equals(fileNameWithoutExt, StringComparison.OrdinalIgnoreCase));

            if (targetFile == null)
                return "File not found";

            try
            {
                File.Delete(targetFile);
                return "File deleted successfully";
            }
            catch (Exception ex)
            {
                return $"Error deleting file: {ex.Message}";
            }
        }

    }
}