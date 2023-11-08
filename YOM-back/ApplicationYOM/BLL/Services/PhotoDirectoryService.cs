using BLL.Interfaces;
using BLL.Validation.Exceptions;

namespace BLL.Services
{
    public class PhotoDirectoryService : IPhotoDirectoryService
    {
        public PhotoDirectoryService()
        {
            var currentDirectory = Path.GetDirectoryName(Directory.GetCurrentDirectory());
            CurrentDirectory = Path.GetFullPath(Path.Combine(currentDirectory!, "DAL", "Photos"));
        }

        /// <summary>
        /// Gets the current photo directory.
        /// </summary>
        public string CurrentDirectory { get; }

        private async Task<string> CreateDirectory(string path)
        {
            try
            {
                var pathToDirectory = Path.Combine(CurrentDirectory, path);
                if (IsDirectoryExists(pathToDirectory))
                    await DeleteAllFilesInDirectory(pathToDirectory);
                await Task.Run(() => Directory.CreateDirectory(pathToDirectory));
                return path;
            }
            catch (Exception ex)
            {
                throw new DirectoryException(ex.Message);
            }
        }

        private async Task<string> CreateUserDirectory(string path)
        {
            try
            {
                var pathToDirectory = Path.Combine(CurrentDirectory, path);
                if (IsDirectoryExists(pathToDirectory))
                    await DeleteAllImagesInDirectory(pathToDirectory);
                await Task.Run(() => Directory.CreateDirectory(pathToDirectory));
                return path;
            }
            catch (Exception ex)
            {
                throw new DirectoryException(ex.Message);
            }
        }

        public async Task DeleteDirectory(string path)
        {
            var pathToDirectory = Path.Combine(CurrentDirectory, path);
            try
            {
                if (!IsDirectoryExists(pathToDirectory))
                    await Task.Run(() => Directory.Delete(pathToDirectory));
            }
            catch (Exception ex)
            {
                throw new DirectoryException(ex.Message);
            }
        }

        private bool IsDirectoryExists(string path)
        {
            return Directory.Exists(path);
        }

        private async Task DeleteAllFilesInDirectory(string path)
        {
            var directory = new DirectoryInfo(path);
            foreach (var file in directory.GetFiles())
            {
                file.Delete();
            }
        }
        private async Task DeleteAllImagesInDirectory(string path)
        {
            var imageExtensions = new List<string> { ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff" };
            var files = Directory.GetFiles(path);
            var imageFiles = files.Where(file => imageExtensions.Contains(Path.GetExtension(file).ToLower())).ToList();
            foreach (var imageFile in imageFiles)
            {
                await Task.Run(()=> File.Delete(imageFile));
            }
        }

        public async Task<string> GetPathUserDirectory(string userId)
        {
            var createdPath = await CreateUserDirectory(@$"{userId}");
            var returnPath = await CreateUserDirectory(createdPath);
            return  returnPath;
        }

        public async Task<string> GetPathUserReviewDirectory(string senderId, string receiveId, ulong adId)
        {
            var path = Path.Combine(@$"{receiveId}", "Reviews", $"{senderId}", $"{adId}");
            var createdPath = await CreateDirectory(path);
            var returnPath = await CreateDirectory(createdPath);
            return returnPath;
        }

        public async Task<string> GetPathAdDirectory(string userId)
        {
            return await CreateDirectory($"{userId}\\{Guid.NewGuid()}");
        }

        public async Task<string> GetPathBannerDirectory(ulong bannerId)
        {
            var path = $"Banners\\{bannerId}\\{Guid.NewGuid()}";
             await CreateDirectory(path);
             return path;
        }

        public async Task<IEnumerable<string>> GetAllFiles(string path)
        {
            if (IsDirectoryExists(path))
            {
                var files = Directory.EnumerateFiles(path);
                if(files is null)
                    return Enumerable.Empty<string>();
                return files.Select(filePath => Path.GetFileName(filePath)).ToList();
            }
            return Enumerable.Empty<string>();
        }
    }
}
