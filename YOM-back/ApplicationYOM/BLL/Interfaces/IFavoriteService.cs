using BLL.Models;
using BLL.Models.Enums;

namespace BLL.Interfaces
{
    public interface IFavoriteService
    {
        Task AddAdFavoriteAsync(FavoriteAd favorite);
        Task RemoveFromFavoriteAsync(ulong adId, string userId);
        Task<IEnumerable<FavoriteAd>> GetAllUserFavoriteAsync(string userId, GridSortDirection gridSortDirection, int? pageNumber, int? pageSize);
    }
}
