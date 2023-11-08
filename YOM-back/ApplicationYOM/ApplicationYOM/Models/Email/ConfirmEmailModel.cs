using IdentityServer4.Models;
using System.ComponentModel.DataAnnotations;

namespace PL.Models.Email
{
    public class ConfirmEmailModel
    {
        [Required]
        public string userId { get; set; }

        [Required(ErrorMessage = "Verification code can't be null")]
        public string code { get; set; }
    }
}
