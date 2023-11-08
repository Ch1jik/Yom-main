using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Category;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : Controller
    {
        private readonly ISubCategoryService _subCategoryService;
        private readonly IMapper _mapper;
        private readonly ILogger<SubCategoryController> _logger;

        public SubCategoryController(ISubCategoryService subCategoryService, IMapper mapper, ILogger<SubCategoryController> logger)
        {
            _subCategoryService = subCategoryService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpGet("AllSubCategories")]
        public async Task<IEnumerable<SubCategoryModel>> GetAllSubCategories()
        {
            var unmappedSubCategories = await _subCategoryService.GetAllSubCategoriesAsync();
            return _mapper.Map<IEnumerable<SubCategoryModel>>(unmappedSubCategories);
        }

        [HttpGet("AllSubCategories/{CategoryId}")]
        public async Task<IEnumerable<SubCategoryModel>> GetAllSubCategoriesById(int CategoryId)
        {
            var unmappedSubCategories = await _subCategoryService.GetAllSubCategoriesByCategoryAsync(CategoryId);
            return _mapper.Map<IEnumerable<SubCategoryModel>>(unmappedSubCategories);
        }

        [HttpGet("TopSubCategories")]
        public async Task<IEnumerable<SubCategoryModel>> GetAllSubCategoriesById()
        {
            var unmappedSubCategories = await _subCategoryService.GetPopularSubCategories();
            return _mapper.Map<IEnumerable<SubCategoryModel>>(unmappedSubCategories);
        }

        [HttpPost("AddClicks")]
        public async Task<IActionResult> AddClicks(int subCategoryId)
        {
            try
            {
                await _subCategoryService.AddClicks(subCategoryId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message, ex);
                return BadRequest(ex.Message);
            }
        }
    }
}
