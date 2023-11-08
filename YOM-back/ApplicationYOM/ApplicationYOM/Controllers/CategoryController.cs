using AutoMapper;
using BLL.Interfaces;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Category;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<CategoryController> _logger;

        public CategoryController(ICategoryService categoryService, IMapper mapper, ILogger<CategoryController> logger)
        {
            _categoryService = categoryService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("AllCategories")]
        public async Task<IEnumerable<CategoryModel>> GetAllCategories()
        {
            var unmappedResult = await _categoryService.GetAllCategoriesAsync();
            return _mapper.Map<IEnumerable<CategoryModel>>(unmappedResult);
        }

        [HttpPost("AddClicks")]
        public async Task<IActionResult> AddClicks(int сategoryId)
        {
            try
            {
                await _categoryService.AddClicks(сategoryId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("TopCategories")]
        public async Task<IEnumerable<CategoryModel>> GetAllCategoriesById()
        {
            var unmappedSubCategories = await _categoryService.GetPopularCategories();
            return _mapper.Map<IEnumerable<CategoryModel>>(unmappedSubCategories);
        }
    }
}
