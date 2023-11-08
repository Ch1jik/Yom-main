using IdentityServer4.Models;
using System.ComponentModel.DataAnnotations;

namespace PL.Models.Email
{
    public class EmailModel
    {
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; }
    }
}
