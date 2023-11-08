using AutoMapper;
using BLL.Interfaces;
using BLL.Models.Ads;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Ad;

namespace PL.Controllers
{
    // TODO : admin only
    [ApiController]
    [Route("api/Admin/Ad")]
    public class AdminAdController : Controller
    {
        private readonly IAdService _adService;
        private readonly IMapper _mapper;

        public AdminAdController(IAdService adService, IMapper mapper)
        {
            _adService = adService;
            _mapper = mapper;
        }

        [HttpGet("AllAds")]
        public async Task<IEnumerable<AdModel>> GetAllAd()
        {
            var unMappedAds = await _adService.GetAllAsync();
            return _mapper.Map<IEnumerable<AdModel>>(unMappedAds);
        }

        [HttpGet("AllAds/ByStatus")]
        public async Task<IEnumerable<AdModel>> GetAdByStatus(AdState adState, int? pageNumber, int? pageSize)
        {
            var mappedState = _mapper.Map<BLL.Models.Enums.AdState>(adState);
            var unMappedAds = await _adService.GetAdByState(mappedState, pageNumber, pageSize);
            return _mapper.Map<IEnumerable<AdModel>>(unMappedAds);
        }

        [HttpPut("UpdateAd/WithPhotos")]
        public async Task<IActionResult> UpdateAdWithPhotos([FromForm] AdUpdateModel ad, IFormFileCollection? photos)
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
        [HttpPut("UpdateAd/State")]
        public async Task<IActionResult> UpdateAdState(AdState adState, ulong adId)
        {
            try
            {
                var mappedState = _mapper.Map<BLL.Models.Enums.AdState>(adState);
                await _adService.ChangeAdState(adId, mappedState);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // to delete any ad (filtering content)
        [HttpDelete("Delete/{AdId}")]
        public async Task<IActionResult> DeleteAd(ulong AdId)
        {
            try
            {
                await _adService.DeleteAsync(AdId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
