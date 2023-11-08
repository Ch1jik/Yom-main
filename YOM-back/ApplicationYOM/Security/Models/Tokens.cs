namespace Security.Models
{
    public class Tokens
    {
        public string PasswordResetToken { get; set; }
        public string EmailVerificationToken { get; set; }

        public AccessToken AccessToken { get; set; }
        public RefreshToken RefreshToken { get; set; }
    }

    public class AccessToken
    {
        public string Token { get; set; }
        public string Expiry { get; set; }
    }

    public class RefreshToken
    {
        public string Token { get; set; }
        public DateTime Expiry { get; set; }
    }
}