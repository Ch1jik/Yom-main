using BLL.Models;
using BLL.Models.Ads;
using BLL.Models.Enums;
using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces
{
    public interface IAdService
    {
        Task<IEnumerable<Ad>> GetByUserId(string userId, int? pageNumber, int? pageSize);

        Task<SubCategory> GetAdCategoryInfo(int id);

        Task AddAsync(Ad model, IEnumerable<IFormFile>? photos);

        Task DeleteAsync(ulong modelId);

        Task DeleteByUserAsync(ulong modelId);

        Task UpdateAdWithPhotosAsync(Ad model, IEnumerable<IFormFile>? photos);

        Task UpdateAdAsync(Ad model);

        Task UpdateAdAutoAsync(Ad model);

        Task UpdateAdHouseAsync(Ad model);

        Task<IEnumerable<Ad>> GetAllAsync();

        Task<IEnumerable<Ad>> GetAllByQueryAsync(FilterState query);

        Task AddToPopularityAsync(ulong adId);

        Task<ulong> GetAdPopularityAsync(ulong adId);

        Task AddPhoneClicksAsync(ulong adId);

        Task<IEnumerable<Ad>> GetTopAds(ulong categoryId, int? pageNumber, int? pageSize);

        Task ChangeAdPlan(ulong adId, AdvertisementPlan advertisementPlan);

        Task ChangeAdState(ulong adId, AdState state);

        Task<IEnumerable<Ad>> GetAdByState(AdState state, int? pageNumber, int? pageSize);
    }
}
