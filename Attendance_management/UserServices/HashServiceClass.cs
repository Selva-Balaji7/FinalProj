using Sodium;

namespace Attendance_management.UserServices
{
    public class HashServiceClass
    {
        public string HashPassword(string password)
        {
            return PasswordHash.ArgonHashString(password, PasswordHash.StrengthArgon.Moderate);
        }

        public bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            return PasswordHash.ArgonHashStringVerify(hashedPassword, inputPassword);
        }
    }
}
