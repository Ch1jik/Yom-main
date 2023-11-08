using BLL.Interfaces;
using BLL.Validation.Exceptions;
using DAL.Entities;
using DAL.Interfaces;

namespace BLL.Services
{
    public class ApplicationUserService : IApplicationUserService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> _userManager;

        public ApplicationUserService(IUnitOfWork unitOfWork, Microsoft.AspNetCore.Identity.UserManager<ApplicationUser> userManager)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
        }

        public async Task<ApplicationUser?> GetByEmail(string email)
        {
            return await _unitOfWork.UserRepository.GetByParamAsync(x => x.Email == email);
        }

        public async Task<ApplicationUser?> GetById(string id)
        {
            return await _unitOfWork.UserRepository.GetByParamAsync(m => m.Id == id);
        }

        public async Task DeleteById(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                await _userManager.DeleteAsync(user);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}