using System.ComponentModel.DataAnnotations;

namespace PL.Models.User
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Please enter your full name")]
        [MaxLength(200, ErrorMessage = "The {0} must be maximum {1} characters long.")]
        [DataType(DataType.Text)]
        [Display(Name = "Full Name")]
        public string FullName { get; set; }

        [Required(ErrorMessage = "Please enter your login name")]
        [MaxLength(200, ErrorMessage = "The {0} must be maximum {1} characters long.")]
        [DataType(DataType.Text)]
        [Display(Name = "Login Name")]
        public string Login { get; set; }

        [Display(Name = "Email")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [DataType(DataType.EmailAddress)]
        [Required(ErrorMessage = "Please enter your email address.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Please enter a password")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters or atmost {1} characters.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Please enter your password again")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "Your passwords don't seem to match.")]
        public string ConfirmPassword { get; set; }
    }
}
