using AutoMapper;
using BLL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PL.Models.Filtering;
using PL.Models.Review;
using UserRating = PL.Models.Review.UserRating;
using UserReview = PL.Models.Review.UserReview;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserReviewController : Controller
    {
        private readonly IUserReviewService _userReviewService;
        private readonly IMapper _mapper;
        public UserReviewController(IUserReviewService userReviewService, IMapper mapper)
        {
            _userReviewService = userReviewService;
            _mapper = mapper;
        }

        [HttpPost("Add")]
        public async Task<IActionResult> AddReviewAsync([FromForm]UserReviewAdd model)
        {
            try
            {
                var mappedReview = _mapper.Map<BLL.Models.UserReviews.UserReview>(model);
                await _userReviewService.AddUserReviewAsync(mappedReview, model.Photos);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("AllUserRatings")]
        public async Task<UserRating> GetAllUserReviewRatingsAsync(string userId)
        {
            var rating = await _userReviewService.GetAllRatingsAsync(userId);
            return _mapper.Map<UserRating>(rating);
        }

        [HttpGet("AllUserReview")]
        public async Task<IEnumerable<UserReview>> GetAllUserReviewAsync(string userId, int pageNumber, GridSortDirection gridSortDirection)
        {
            var sortDirection = _mapper.Map<BLL.Models.Enums.GridSortDirection>(gridSortDirection);
            var reviews = await _userReviewService.GetAllReviewByUserAsync(userId, pageNumber, sortDirection);
            return _mapper.Map<IEnumerable<UserReview>>(reviews);
        }
        [Authorize]
        [HttpDelete("SelfSent")]
        public async Task<IActionResult> DeleteUserReviewAsync(ulong reviewId)
        {
            try
            {
                var userId = User.Identities.FirstOrDefault().Claims.FirstOrDefault().Value;
                if (string.IsNullOrEmpty(userId)) 
                    return BadRequest("Something went wrong");
                await _userReviewService.DeleteUserReviewAsync(userId, reviewId);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
