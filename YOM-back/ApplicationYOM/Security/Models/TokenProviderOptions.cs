namespace Security.Models
{
    public class TokenProviderOptions
    {
        /// <summary>
        /// The issuer (iss) claim for generated tokens
        /// </summary>
        public string Issuer { get; set; } = null!;

        /// <summary>
        /// Intended audience for the token.
        /// aud claim of the generated token
        /// </summary>
        public string Audience { get; set; } = null!;

        /// <summary>
        /// Expiration time for the access token
        /// </summary>
        public int AccessTokenExpiryInMinutes { get; set; }

        /// <summary>
        /// Expiration time for the refresh token
        /// </summary>
        public int RefreshTokenExpiryInDays { get; set; }

        /// <summary>
        /// The signing key to use when generating tokens.
        /// </summary>
        public string Secret { get; set; } = null!;

        /// <summary>
        /// Generates a random value (nonce) for each generated token.
        /// </summary>
        /// <remarks>The default nonce is a random GUID.</remarks>
        public Func<Task<string>> NonceGenerator { get; set; }
            = () => Task.FromResult(Guid.NewGuid().ToString());
    }
}