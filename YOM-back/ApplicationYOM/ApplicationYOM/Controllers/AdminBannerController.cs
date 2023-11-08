using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Banner;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminBannerController : Controller
    {
        private readonly ILogger<AdminBannerController> _logger;
        private readonly IBannerService _bannerService;
        private readonly IMapper _mapper;
        public AdminBannerController(ILogger<AdminBannerController> logger, IBannerService bannerService, IMapper mapper)
        {
            _logger = logger;
            _bannerService = bannerService;
            _mapper = mapper;
        }

        [HttpGet("All")]
        public async Task<IEnumerable<BannerModel>> GetAllBanners()
        {
            var unmappedBanners = await _bannerService.GetAllBanners();
            return _mapper.Map<IEnumerable<BannerModel>>(unmappedBanners);
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateBanner([FromForm] CreateBannerModel model)
        {
            try
            {
                var mappedBanner = _mapper.Map<Banner>(model);
                await _bannerService.CreateBannerAsync(mappedBanner, model.Photo);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Update")]
        public async Task<IActionResult> UpdateBanner(BannerModel model)
        {
            try
            {
                var mappedBanner = _mapper.Map<Banner>(model);
                await _bannerService.UpdateBannerAsync(mappedBanner);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Update/WithPhoto")]
        public async Task<IActionResult> UpdateBannerWithPhoto([FromForm]UpdateBannerModel model)
        {
            try
            {
                var mappedBanner = _mapper.Map<Banner>(model);
                await _bannerService.UpdateBannerWithPhotoAsync(mappedBanner, model.Photo);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        [HttpPost("Update/State")]
        public async Task<IActionResult> UpdateBannerState(ulong bannerId, BannerState bannerState)
        {
            try
            {
                
                await _bannerService.UpdateBannerState(bannerId, _mapper.Map<BLL.Models.Enums.BannerState>(bannerState));
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }

        [HttpDelete("ById/{Id}")]
        public async Task<IActionResult> DeleteBanner(ulong Id)
        {
            try
            {
                await _bannerService.DeleteBannerAsync(Id);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
