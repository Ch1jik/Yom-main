using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface IPhotoService
    {
        Task<string?> UploadPhotoAsync<T>(IEnumerable<IFormFile>? photos, T entity, string? folderPath = null);
        Task DeletePhotoByPathAsync(string? path);
        Task<string?> UploadPhotoAsync<T>(IFormFile photo, T entity, string? folderPath = null);
        Task<IEnumerable<string>> GetPhotosPathAsync(string path);
        Task<string?> GetUrlPhotoPath(string path);
        Task<IEnumerable<string?>> GetUrlAllPhotosPath(string path);
    }
}
