using System.ComponentModel.DataAnnotations;

namespace PL.Models.User
{
    public class ForgotPasswordModel
    {
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        [DataType(DataType.EmailAddress)]
        [Required]
        public string Email { get; set; }
    }
}
