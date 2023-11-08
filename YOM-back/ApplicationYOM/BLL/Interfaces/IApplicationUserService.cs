using DAL.Entities;

namespace BLL.Interfaces
{
    public interface IApplicationUserService
    {
        Task<ApplicationUser?> GetByEmail(string email);

        Task<ApplicationUser?> GetById(string id);

        Task DeleteById(string id);
    }
}