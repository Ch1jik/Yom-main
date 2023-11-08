using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Filtering;
using FavoriteAdCreate = PL.Models.Favorite.FavoriteAdCreate;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FavoriteAdController : Controller
    {
        private readonly ILogger<FavoriteAdController> _logger;
        private readonly IFavoriteService _favoriteService;
        private readonly IMapper _mapper;
        public FavoriteAdController(IMapper mapper, IFavoriteService favoriteService, ILogger<FavoriteAdController> logger)
        {
            _favoriteService = favoriteService;
            _mapper = mapper;
            _logger = logger;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddToFavorite(FavoriteAdCreate model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            try
            { 
                var mappedFavoriteAd = _mapper.Map<BLL.Models.FavoriteAd>(model);
                await _favoriteService.AddAdFavoriteAsync(mappedFavoriteAd);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("Remove")]
        public async Task<IActionResult> RemoveFromFavorite(ulong adId, string userId)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid data");
            }

            try
            {
                await _favoriteService.RemoveFromFavoriteAsync(adId, userId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("AllUserFavorite")]
        public async Task<IEnumerable<FavoriteAd>> GetAllUserFavorite(string userId, GridSortDirection gridSortDirection, int? pageNumber)
        {
            var mappedDirection = _mapper.Map<BLL.Models.Enums.GridSortDirection>(gridSortDirection);
            var allFavorite = await _favoriteService.GetAllUserFavoriteAsync(userId, mappedDirection, pageNumber, null);
            return _mapper.Map<IEnumerable<FavoriteAd>>(allFavorite);
        }
    }
}
