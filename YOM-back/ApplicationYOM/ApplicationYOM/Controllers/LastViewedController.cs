using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Ad;
using PL.Models.LastViewed;
using LastViewedHistory = PL.Models.LastViewed.LastViewedHistory;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LastViewedController : Controller
    {
        private readonly ILastViewedService _lastViewedService;
        private readonly IMapper _mapper;
        public LastViewedController(ILastViewedService lastViewedService, IMapper mapper)
        {
            _lastViewedService = lastViewedService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> AddToLastViewed(LastViewedHistoryAction model)
        {
            try
            {
                var mappedModel = _mapper.Map<BLL.Models.LastViewedHistory>(model);
                await _lastViewedService.AddAdToLastViewedAsync(mappedModel);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IEnumerable<LastViewedHistory>> AddToLastViewed([FromQuery]LastViewedHistoryGet model)
        {
            var lastViewedAds = await _lastViewedService.GetLastViewedAdsAsync(model.UserId, model.PageNumber, model.PageSize);
            return _mapper.Map<IEnumerable<LastViewedHistory>>(lastViewedAds);
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFromLastViewed(LastViewedHistoryAction model)
        {
            try
            {
                var mappedModel = _mapper.Map<BLL.Models.LastViewedHistory>(model);
                await _lastViewedService.RemoveAdFromLastViewedAsync(mappedModel);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
