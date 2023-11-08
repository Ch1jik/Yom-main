using AutoMapper;
using BLL.Interfaces;
using BLL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PL.Models;
using PL.Models.User;

namespace PL.Controllers
{
    /// <summary>
    /// User controller
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("Edit/Profile")]
        public async Task<Models.User.User> EditUserProfileAsync([FromForm]EditUser user)
        {
            var mappedUser = _mapper.Map<BLL.Models.User>(user);
            if (user.Photo is not null)
                await _userService.UpdateAsync(mappedUser, user.Photo);
            else
                await _userService.UpdateAsync(mappedUser);
            var result = await _userService.GetByIdAsync(user.Id);
            return _mapper.Map<Models.User.User>(result);
        }

        [HttpGet("ById/{UserId}")]
        public async Task<Models.User.User> GetByUserIdAsync(string UserId)
        {
            var user = await _userService.GetByIdAsync(UserId);
            return _mapper.Map<Models.User.User>(user);
        }
    }
}
