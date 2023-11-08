using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using PL.Models;
using PL.Models.Category;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/Admin/SubCategory")]
    public class AdminSubCategoryController : Controller
    {
        private readonly ISubCategoryService _subCategoryService;
        private readonly IMapper _mapper;

        public AdminSubCategoryController(ISubCategoryService subCategoryService, IMapper mapper)
        {
            _subCategoryService = subCategoryService;
            _mapper = mapper;
        }

        [HttpGet("ById/{SubCategoryId}")]
        public async Task<SubCategoryModel> GetSubCategory(int SubCategoryId)
        {
            var unmappedResult = await _subCategoryService.GetSubCategoryAsync(SubCategoryId);
            return _mapper.Map<SubCategoryModel>(unmappedResult);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> CreateSubCategory(SubCategoryModel subCategoryModel)
        {
            try
            {
                var unmappedSubCategory = _mapper.Map<SubCategory>(subCategoryModel);
                await _subCategoryService.AddSubCategoryAsync(unmappedSubCategory);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("Update")]
        public async Task<IActionResult> UpdateSubCategory(SubCategoryUpdateModel subCategoryUpdateModel)
        {
            try
            {
                var mappedCategory = _mapper.Map<SubCategory>(subCategoryUpdateModel);
                await _subCategoryService.UpdateSubCategoryAsync(mappedCategory);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public async Task<IActionResult> DeleteSubCategory(ulong subCategoryId)
        {
            try
            {
                await _subCategoryService.DeleteSubCategoryByIdAsync(subCategoryId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
