using BLL.Models;

namespace BLL.Interfaces
{
    public interface ICategoryService
    {
        public Task<IEnumerable<Category>> GetAllCategoriesAsync();

        public Task AddCategoryAsync(Category title);

        public Task<Category> GetCategoryAsync(int categoryId);

        public Task UpdateCategoryAsync(Category category);

        public Task DeleteCategoryByIdAsync(ulong categoryId);

        public Task AddClicks(int categoryId);

        public Task<IEnumerable<Category>> GetPopularCategories();
    }
}
