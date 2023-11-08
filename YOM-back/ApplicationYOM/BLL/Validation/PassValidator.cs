using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BLL.Validation
{
    public class PassValidator
    {
        private readonly int keySize;
        private readonly int iterations;
        private readonly HashAlgorithmName hashAlgorithm;
        private readonly string salt;

        public PassValidator()
        {
            keySize = 64;
            iterations = 350000;
            hashAlgorithm = HashAlgorithmName.SHA512;
            salt = "usualSalt";
        }

        public PassValidator(int keySize, int iterations, HashAlgorithmName hashAlgorithm)
        {
            this.keySize = keySize;
            this.iterations = iterations;
            this.hashAlgorithm = hashAlgorithm;
            this.salt = "usualSalt";
        }

        public string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
                       password,
                       Encoding.UTF8.GetBytes(this.salt),
                       iterations,
                       HashAlgorithmName.SHA256))
            {
                byte[] hashBytes = algorithm.GetBytes(keySize / 8);
                return Convert.ToBase64String(hashBytes);
            }
        }

        public bool VerifyPassword(string password, string hash)
        {
            string hashedPassword = HashPassword(password);
            return hash == hashedPassword;
        }
    }
}
