using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace PL.Controllers
{
    [ApiController]
    [Route("api/Admin/UserReview")]
    public class AdminUserReviewController : Controller
    {
        private readonly IUserReviewService _userReviewService;
        public AdminUserReviewController(IUserReviewService userReviewService)
        {
            _userReviewService = userReviewService;
        }

        [HttpDelete("Remove")]
        public async Task<IActionResult> RemoveFromFavoriteAsync(ulong id)
        {
            try
            {
                await _userReviewService.DeleteUserReviewAsync(null, id);
                return Ok("Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
