using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Category;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/Admin/Category")]
    public class AdminCategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;

        public AdminCategoryController(ICategoryService categoryService, IMapper mapper)
        {
            _categoryService = categoryService;
            _mapper = mapper;
        }

        [HttpGet("ById/{CategoryId}")]
        public async Task<CategoryModel> GetCategory(int CategoryId)
        {
            var unmappedResult = await _categoryService.GetCategoryAsync(CategoryId);
            return _mapper.Map<CategoryModel>(unmappedResult);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddCategory(CategoryAddModel category)
        {
            try
            {
                var mappedResult = _mapper.Map<BLL.Models.Category>(category);
                await _categoryService.AddCategoryAsync(mappedResult);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateCategory(CategoryUpdateModel category)
        {
            try
            {
                var mappedCategory = _mapper.Map<CategoryUpdateModel, BLL.Models.Category>(category);
                await _categoryService.UpdateCategoryAsync(mappedCategory);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete/{CategoryId}")]
        public async Task<IActionResult> DeleteCategory(ulong CategoryId)
        {
            try
            {
                await _categoryService.DeleteCategoryByIdAsync(CategoryId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
