using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Ads;
using BLL.Services;
using DAL.Helpers;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Ad;
using PL.Models.Filtering;
using AdState = BLL.Models.Enums.AdState;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdController : Controller
    {
        private readonly ILogger<AdController> _logger;
        private readonly IAdService _adService;
        private readonly IMapper _mapper;

        public AdController(ILogger<AdController> logger, IAdService adService, IMapper mapper)
        {
            _logger = logger;
            _adService = adService;
            _mapper = mapper;
        }

        [HttpPost("Create")]
        public async Task<IActionResult> CreateAd([FromForm] AdCreateModel ad, IEnumerable<IFormFile>? photos)
        {
            try
            {
                await _adService.AddAsync(_mapper.Map<AdCreateModel, Ad>(ad), photos);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create/House")]
        public async Task<IActionResult> CreateHouseAd([FromForm] AdCreateHouseModel ad, IEnumerable<IFormFile>? photos)
        {
            try
            {
                await _adService.AddAsync(_mapper.Map<Ad>(ad), photos);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Create/Auto")]
        public async Task<IActionResult> CreateAutoAd([FromForm] AdCreateAutoModel ad, IEnumerable<IFormFile>? photos)
        {
            try
            {
                await _adService.AddAsync(_mapper.Map<Ad>(ad), photos);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("BuyPlan")]
        public async Task<IActionResult> ChangePlan(ulong adId, Models.Ad.AdvertisementPlan advertisementPlan)
        {
            try
            {
                var mappedPlan = _mapper.Map<BLL.Models.Enums.AdvertisementPlan>(advertisementPlan);
                await _adService.ChangeAdPlan(adId, mappedPlan);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("AllAd/ByUserId")]
        public async Task<IEnumerable<AdModel>> GetAllAdByUserId(string userId, int? pageNumber, int? pageSize)
        {
            var unMappedAds = await _adService.GetByUserId(userId, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<AdModel>>(unMappedAds);
        }

        [HttpGet("AllAd/ByQuery")]
        public async Task<IEnumerable<AdModel>> GetAllAdByQueue([FromQuery] Models.Filtering.FilterState adSearchQuery)
        {
            var mappedSearch = _mapper.Map<BLL.Models.FilterState>(adSearchQuery);
            var unmappedQueueResult = await _adService.GetAllByQueryAsync(mappedSearch);
            return _mapper.Map<IEnumerable<AdModel>>(unmappedQueueResult);
        }

        [HttpGet("Popularity/Top")]
        public async Task<IEnumerable<AdPopular>> GetTopPopularity(ulong categoryId, int? pageNumber, int? pageSize)
        {
            var ads = await _adService.GetTopAds(categoryId, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<AdPopular>>(ads);
        }

        [HttpGet("Popularity/Ad/{adId}")]
        public async Task<ulong> GetTopPopularity(ulong adId)
        {
            return await _adService.GetAdPopularityAsync(adId);
        }

        [HttpPut("UpdateAd/WithPhotos")]
        public async Task<IActionResult> UpdateAdWithPhotos([FromForm] AdUpdateModel ad, IEnumerable<IFormFile>? photos)
        {
            try
            {
                var mappedAd = _mapper.Map<Ad>(ad);
                await _adService.UpdateAdWithPhotosAsync(mappedAd, photos);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateAd")]
        public async Task<IActionResult> UpdateAd(AdUpdateModel ad)
        {
            try
            {
                var mappedAd = _mapper.Map<Ad>(ad);
                await _adService.UpdateAdAsync(mappedAd);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateAd/Auto")]
        public async Task<IActionResult> UpdateAutoAd(AdUpdateAutoModel ad)
        {
            try
            {
                var mappedAd = _mapper.Map<Ad>(ad);
                await _adService.UpdateAdAutoAsync(mappedAd);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateAd/House")]
        public async Task<IActionResult> UpdateHouseAd(AdUpdateHouseModel ad)
        {
            try
            {
                var mappedAd = _mapper.Map<Ad>(ad);
                await _adService.UpdateAdHouseAsync(mappedAd);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("UpdateAd/ToDeactivated")]
        public async Task<IActionResult> ChangeAdStateToDeactivated(ulong adId)
        {
            try
            {
                var mappedAdState = _mapper.Map<BLL.Models.Enums.AdState>(AdState.Deactivated);
                await _adService.ChangeAdState(adId, mappedAdState);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Delete/{AdId}")]
        public async Task<IActionResult> DeleteAd(ulong AdId)
        {
            try
            {
                await _adService.DeleteByUserAsync(AdId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("Popularity/Add")]
        public async Task<IActionResult> AddCountToPopular(ulong adId)
        {
            try
            {
                await _adService.AddToPopularityAsync(adId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("PhoneClicks/Add")]
        public async Task<IActionResult> AddCountToPhone(ulong adId)
        {
            try
            {
                await _adService.AddPhoneClicksAsync(adId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
