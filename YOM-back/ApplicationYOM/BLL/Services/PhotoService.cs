using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Ads;
using BLL.Validation;
using BLL.Validation.Exceptions;
using DAL.Entities;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace BLL.Services
{
    public class PhotoService : IPhotoService
    {
        private readonly IPhotoDirectoryService _photoDirectoryService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PhotoService(IPhotoDirectoryService photoDirectoryService, IWebHostEnvironment webHostEnvironment)
        {
            _photoDirectoryService = photoDirectoryService;
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<string?> UploadPhotoAsync<T>(IEnumerable<IFormFile>? photos, T entity, string? folderPath = null)
        {
            try
            {
                if (photos is null)
                    return null;
                foreach (var photo in photos)
                {
                    if (!ImageValidator.IsImage(photo))
                        throw new AdException($"{photo.FileName} not a photo");
                }

                folderPath ??= entity switch
                {
                    DAL.Entities.Ad ad => await _photoDirectoryService.GetPathAdDirectory(ad.UserId),
                    Models.Ads.Ad ad => await _photoDirectoryService.GetPathAdDirectory(ad.UserId),
                    User user => await _photoDirectoryService.GetPathUserDirectory(user.Id),
                    UserReview userReview => await _photoDirectoryService.GetPathUserReviewDirectory(userReview.SenderId, userReview.ReceiverId, (ulong)userReview.AdId),
                    _ => throw new ArgumentException("Unsupported entity type")
                };

                var currentDirectory = Path.GetDirectoryName(Directory.GetCurrentDirectory());
                var directory = Path.GetFullPath(Path.Combine(currentDirectory!, "DAL", "Photos"));

                foreach (var photo in photos)
                {
                    await using (var fileStream = new FileStream(Path.Combine(Path.Combine(directory, folderPath), Guid.NewGuid() + Path.GetExtension(photo.FileName)), FileMode.Create))
                    {
                        await photo.CopyToAsync(fileStream);
                    }
                }

                return folderPath;
            }
            catch (Exception ex)
            {
                throw new PhotoException(ex.Message);
            }
        }

        public async Task<string?> UploadPhotoAsync<T>(IFormFile photo, T entity, string? folderPath = null)
        {
            try
            {
                if (!ImageValidator.IsImage(photo))
                    throw new AdException($"{photo.FileName} not a photo");
                folderPath ??= entity switch
                {
                    DAL.Entities.Ad ad => await _photoDirectoryService.GetPathAdDirectory(ad.UserId),
                    Models.Ads.Ad ad => await _photoDirectoryService.GetPathAdDirectory(ad.UserId),
                    User user => await _photoDirectoryService.GetPathUserDirectory(user.Id),
                    Models.Banner banner => await _photoDirectoryService.GetPathBannerDirectory(banner.Id),
                    _ => throw new ArgumentException("Unsupported entity type")
                };

                await using (var fileStream = new FileStream(Path.Combine(Path.Combine(_webHostEnvironment.WebRootPath, folderPath), Guid.NewGuid() + Path.GetExtension(photo.FileName)), FileMode.Create))
                {
                    await photo.CopyToAsync(fileStream);
                }

                return folderPath;
            }
            catch (Exception ex)
            {
                throw new PhotoException(ex.Message);
            }
        }

        public async Task DeletePhotoByPathAsync(string? path)
        {
            try
            {
                if (path is not null)
                    await _photoDirectoryService.DeleteDirectory(path);
            }
            catch (Exception ex)
            {
                throw new PhotoException(ex.Message);
            }
        }

        public async Task<IEnumerable<string>> GetPhotosPathAsync(string path)
        {
            return await _photoDirectoryService.GetAllFiles(Path.Combine(_webHostEnvironment.WebRootPath, path));
        }

        public async Task<string?> GetUrlPhotoPath(string? path)
        {
            if (string.IsNullOrEmpty(path))
                return null;
            var photoPath = await GetPhotosPathAsync(path);
            if (photoPath is null) return null;
            var url = "https://localhost:7014" + "/Photos/" + path + "/" + photoPath.FirstOrDefault();
            var modifiedUrl = url.Replace("\\", "/");
            return modifiedUrl;
        }

        public async Task<IEnumerable<string?>> GetUrlAllPhotosPath(string path)
        {
            if (string.IsNullOrEmpty(path))
                return null;
            var photoPaths = await GetPhotosPathAsync(path);
            if (photoPaths is null) return null;
            return photoPaths.Select(photo => "https://localhost:7014" + "/Photos/" + path + "/" + photo).Select(url => url.Replace("\\", "/")).ToList();
        }
    }
}
