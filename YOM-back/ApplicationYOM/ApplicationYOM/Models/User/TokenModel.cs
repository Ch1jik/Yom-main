using System.ComponentModel.DataAnnotations;

namespace PL.Models.User
{
    public class TokenModel
    {
        [Required]
        [Display(Name = "Access Token")]
        public string AccessToken { get; set; }

        [Required]
        [Display(Name = "Refresh Token")]
        public string RefreshToken { get; set; }
    }
}
