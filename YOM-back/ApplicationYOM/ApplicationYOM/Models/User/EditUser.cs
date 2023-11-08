using BLL.Models;
using System.ComponentModel.DataAnnotations;

namespace PL.Models.User
{
    public class EditUser
    {
        public string Id { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        [RegularExpression("^(?!0+$)(\\+\\d{1,3}[- ]?)?(?!0+$)\\d{10,15}$", ErrorMessage = "Please enter valid phone number")]
        public string PhoneNumber { get; set; }
        public IFormFile? Photo { get; set; }
    }
}
