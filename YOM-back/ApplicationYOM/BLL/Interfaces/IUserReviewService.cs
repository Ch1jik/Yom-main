using BLL.Models.Enums;
using BLL.Models.UserReviews;
using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface IUserReviewService
    {
        Task AddUserReviewAsync(UserReview review, IEnumerable<IFormFile>? photos);
        Task DeleteUserReviewAsync(string senderId, ulong id);
        Task<IEnumerable<UserReview>> GetAllReviewByUserAsync(string userId, int pageNumber, GridSortDirection gridSortDirection);
        Task<UserRating> GetAllRatingsAsync(string userId);
    }
}
