using AutoMapper;
using BLL.Helpers;
using BLL.Interfaces;
using BLL.Models;
using BLL.Models.Enums;
using BLL.Validation;
using BLL.Validation.Exceptions;
using DAL.Interfaces;

namespace BLL.Services
{
    public class SubCategoryService : ISubCategoryService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SubCategoryService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task<SubCategory> GetSubCategoryAsync(int categoryId)
        {
            var unmappedResult = await _unitOfWork.SubCategoryRepository.GetByParamAsync(u => u.Id == categoryId);
            return _mapper.Map<SubCategory>(unmappedResult);
        }

        public async Task AddSubCategoryAsync(SubCategory category)
        {
            try
            {
                if (CategoryValidator.CheckCategoryTitle(category.Title))
                {
                    var mappedCategory = _mapper.Map<DAL.Entities.SubCategory>(category);
                    _unitOfWork.SubCategoryRepository.Add(mappedCategory);
                    await _unitOfWork.SaveAsync();
                }
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task DeleteSubCategoryByIdAsync(ulong categoryId)
        {
            try
            {
                await _unitOfWork.SubCategoryRepository.DeleteById(categoryId)!;
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task AddClicks(int subCategoryId)
        {
            try
            {
                var subCategory = await _unitOfWork.SubCategoryRepository.GetByParamAsync(u => u.Id == subCategoryId);
                if (subCategory is null)
                    throw new YOMException("SubCategory with this id not exist");
                subCategory.Clicks++;
                _unitOfWork.SubCategoryRepository.Update(subCategory);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }

        public async Task<IEnumerable<SubCategory>> GetPopularSubCategories()
        {
            var filterState = FilterExtension.CreateSingleFilter("Id", GridFilterOperator.isnotnull, null, // filter
                GridSortDirection.asc, "Clicks", 1, 3); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var categories = await _unitOfWork.SubCategoryRepository.GetAllByQueryAsync(mappedFilterState);
            return _mapper.Map<IEnumerable<SubCategory>>(categories);
        }

        public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesAsync()
        {
            var unmappedResult = await _unitOfWork.SubCategoryRepository.GetAll();
            return _mapper.Map<IEnumerable<SubCategory>>(unmappedResult);
        }

        public async Task<IEnumerable<SubCategory>> GetAllSubCategoriesByCategoryAsync(int categoryId)
        {
            var filterState = FilterExtension.CreateSingleFilter("CategoryId", GridFilterOperator.eq, categoryId.ToString(), // filter
                GridSortDirection.asc,"CategoryId",null, null); // sort
            var mappedFilterState = _mapper.Map<DAL.Helpers.FilterState>(filterState);
            var categories = await _unitOfWork.SubCategoryRepository.GetAllByQueryAsync(mappedFilterState);
            return _mapper.Map<IEnumerable<SubCategory>>(categories);
        }

        public async Task UpdateSubCategoryAsync(SubCategory model)
        {
            try
            {
                var subCategory = await _unitOfWork.SubCategoryRepository.GetByParamAsync(u => u.Id == model.Id);
                if (subCategory is null)
                    throw new YOMException("SubCategory with this id not exist");
                subCategory.CategoryId = model.Id;
                subCategory.Title = model.Title;
                _unitOfWork.SubCategoryRepository.Update(subCategory);
                await _unitOfWork.SaveAsync();
            }
            catch (Exception ex)
            {
                throw new YOMException(ex.Message);
            }
        }
    }
}
