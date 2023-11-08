using System.Net.Mail;
using BLL.Models;
using BLL.Validation.Exceptions;

namespace BLL.Validation
{
    public class UserValidator
    {
        public static bool CheckUserData(User user)
        {
            if (string.IsNullOrWhiteSpace(user.UserName) || user.UserName.Length < 5)
                throw new AuthException("This login is invalid");

            try
            {
                var mailAddress = new MailAddress(user.Email);
            }
            catch
            {
                throw new AuthException("This email is invalid");
            }
            return true;
        }
    }
}
