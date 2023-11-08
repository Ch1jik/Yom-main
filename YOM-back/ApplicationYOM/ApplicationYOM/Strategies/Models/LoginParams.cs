using BLL.Interfaces;
using PL.Models;

namespace PL.Strategies.Models
{
#nullable disable

    public class LoginParams
    {
        public string Role { get; set; }
        public string ErrorMessage { get; set; }
        public LoginModel LoginModel { get; set; }
        public IApplicationUserService ApplicationUserService { get; set; }
    }
}