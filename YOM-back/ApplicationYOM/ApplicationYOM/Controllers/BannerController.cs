using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Banner;
using BannerState = BLL.Models.Enums.BannerState;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BannerController : Controller
    {
        private readonly ILogger<BannerController> _logger;
        private readonly IBannerService _bannerService;
        private readonly IMapper _mapper;

        public BannerController(IBannerService bannerService, ILogger<BannerController> logger, IMapper mapper)
        {
            _bannerService = bannerService;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet("ById/{Id}")]
        public async Task<BannerModel> GetBannerById(ulong Id)
        {
            var unmappedBanner = await _bannerService.GetBannerByIdAsync(Id);
            return _mapper.Map<BannerModel>(unmappedBanner);
        }

        [HttpGet("ByCompany/{Company}")]
        public async Task<BannerModel> GetBannerByCompany(string Company)
        {
            var unmappedBanner = await _bannerService.GetBannerByCompanyAsync(Company);
            return _mapper.Map<BannerModel>(unmappedBanner);
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

        [HttpPost("AddClick/ById/{Id}")]
        public async Task AddClickToBanner(ulong Id)
        {
            try
            {
                await _bannerService.AddClicksToBanner(Id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                throw new Exception(ex.Message);
            }
        }
    }
}
