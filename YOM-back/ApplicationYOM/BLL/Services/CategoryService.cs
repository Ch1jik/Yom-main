using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Enums;
using BLL.Validation.Exceptions;
using DAL.Interfaces;

namespace BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AddCategoryAsync(Category category)
        {
            try
            {
                var mappedCategory = _mapper.Map<DAL.Entities.Category>(category);
                _unitOfWork.CategoryRepository.Add(mappedCategory);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteCategoryByIdAsync(ulong categoryId)
        {
            try
            {
                await _unitOfWork.CategoryRepository.DeleteById(categoryId)!;
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task AddClicks(int categoryId)
        {
            try
            {
                var category = await _unitOfWork.CategoryRepository.GetByParamAsync(u => u.Id == categoryId);
                if (category is null)
                    throw new YOMException("SubCategory with this id not exist");
                category.Clicks++;
                _unitOfWork.CategoryRepository.Update(category);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<Category>> GetPopularCategories()
        {
            var filterState = FilterExtension.CreateSingleFilter("Id", GridFilterOperator.isnotnull, null, // filter
                GridSortDirection.asc, "Clicks", 1, 3); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var categories = await _unitOfWork.CategoryRepository.GetAllByQueryAsync(mappedFilterState);
            return _mapper.Map<IEnumerable<Category>>(categories);
        }

        public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
        {
            var unmappedResult = await _unitOfWork.CategoryRepository.GetAll();
            return _mapper.Map<IEnumerable<Category>>(unmappedResult);
        }

        public async Task<Category> GetCategoryAsync(int categoryId)
        {
            var unmappedResult = await _unitOfWork.CategoryRepository.GetByParamAsync(u=> u.Id == categoryId);
            return _mapper.Map<Category>(unmappedResult);
        }

        public async Task UpdateCategoryAsync(Category model)
        {
            try
            {
                var category = await _unitOfWork.CategoryRepository.GetByParamAsync(u => u.Id == (int)model.Id);
                if (category is null)
                    throw new YOMException("SubCategory with this id not exist");
                category.Title = model.Title;
                _unitOfWork.CategoryRepository.Update(category);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
