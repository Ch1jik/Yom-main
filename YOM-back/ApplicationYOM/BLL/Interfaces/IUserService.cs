using BLL.Models;
using DAL.Entities;
using Microsoft.AspNetCore.Http;
using System.Linq.Expressions;

namespace BLL.Interfaces
{
    public interface IUserService
    {
        /// <summary>
        /// return collection all of users
        /// </summary>
        /// <returns>Collection all of users</returns>
        Task<IEnumerable<User?>> GetAll();
        /// <summary>
        /// Check is in db a user with id?
        /// </summary>
        /// <param name="id">user id</param>
        /// <returns>User if exist</returns>
        Task<User> GetByIdAsync(string id);
        /// <summary>
        /// Delete user by id
        /// </summary>
        /// <param name="modelId">User id</param>
        /// <returns>Task</returns>
        Task DeleteAsync(string modelId);
        /// <summary>
        /// Update user
        /// </summary>
        /// <param name="user">User</param>
        /// <returns>Task</returns>
        Task UpdateAsync(User user, IFormFile photo);

        Task UpdateAsync(User user);

        Task<IEnumerable<User>> GetAllUsersByParams(Expression<Func<ApplicationUser, bool>> filterExpression);

        Task<IEnumerable<User>> GetAllUsersByFilter(FilterState query);

        Task BlockUserAsync(string userId);

        Task UnBlockUserAsync(string userId);

        Task<int> GetUsersCountAsync();
        Task<int> GetUsersBlockedCountAsync();

    }
}
