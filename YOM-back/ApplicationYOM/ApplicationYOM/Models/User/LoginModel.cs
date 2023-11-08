using System.ComponentModel.DataAnnotations;

namespace PL.Models
{
    public class LoginModel
    {
        [Display(Name = "Email")]
        [DataType(DataType.EmailAddress)]
        [Required]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
    }
}