using Common.Models;
using System.Security.Claims;

namespace PL.Strategies.Models
{
#nullable disable

    public class LoginOutput
    {
        public ResultModel ResultModel { get; set; }
        public List<Claim> Claims { get; set; }
        public dynamic UserId { get; set; }
    }
}