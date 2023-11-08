using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLL.Models;

namespace BLL.Interfaces
{
    public interface ILastViewedService
    {
        Task AddAdToLastViewedAsync(LastViewedHistory model);
        Task UpdateAdLastViewedAsync(LastViewedHistory model);
        Task RemoveAdFromLastViewedAsync(LastViewedHistory model);
        Task<IEnumerable<LastViewedHistory>> GetLastViewedAdsAsync(string userId, int? pageNumber, int? pageSize);
    }
}
