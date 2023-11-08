using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface IPhotoDirectoryService
    {
        Task<string> GetPathUserDirectory(string userId);
        Task<string> GetPathUserReviewDirectory(string senderId, string receiveId, ulong adId);
        Task<string> GetPathAdDirectory(string userId);
        Task DeleteDirectory(string path);
        Task<IEnumerable<string>> GetAllFiles(string path);
        Task<string> GetPathBannerDirectory(ulong bannerId);
    }
}
