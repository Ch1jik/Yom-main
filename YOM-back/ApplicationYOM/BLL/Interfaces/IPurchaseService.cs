using BLL.Models;

namespace BLL.Interfaces
{
    public interface IPurchaseService
    {
        Task MakePurchase(Purchase model);
        Task<IEnumerable<Purchase>> GetUserPurchase(string userId, int? pageNumber, int? pageSize);
        Task<IEnumerable<Purchase>> GetUserSales(string userId, int? pageNumber, int? pageSize);
        Task<int> GetCountOfPurchase();
        Task DeletePurchase(ulong id);
    }
}
