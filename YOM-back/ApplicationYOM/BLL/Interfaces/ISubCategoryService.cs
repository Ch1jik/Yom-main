using BLL.Models;

namespace BLL.Interfaces
{
    public interface ISubCategoryService
    {
        public Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryAsync(int categoryId);

        public Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync();
        public Task<SubCategory> GetSubCategoryAsync(int categoryId);

        public Task AddSubCategoryAsync(SubCategory category);

        public Task UpdateSubCategoryAsync(SubCategory category);

        public Task DeleteSubCategoryByIdAsync(ulong categoryId);

        public Task AddClicks(int subCategoryId);

        public Task<IEnumerable<SubCategory>> GetPopularSubCategories();
    }
}
