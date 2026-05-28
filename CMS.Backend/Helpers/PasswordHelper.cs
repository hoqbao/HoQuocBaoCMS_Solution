/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 28/05/2026
*/

using Microsoft.AspNetCore.Identity;

namespace CMS.Backend.Helpers
{
    public static class PasswordHelper
    {
        private static readonly PasswordHasher<object> PasswordHasher = new();

        public static string HashPassword(string password)
        {
            return PasswordHasher.HashPassword(new object(), password);
        }

        public static bool VerifyPassword(string password, string passwordHash)
        {
            try
            {
                var result = PasswordHasher.VerifyHashedPassword(
                    new object(),
                    passwordHash,
                    password
                );

                return result == PasswordVerificationResult.Success;
            }
            catch (FormatException)
            {
                // Dành cho dữ liệu cũ đang lưu plain text như 123456
                return password == passwordHash;
            }
        }
    }
}