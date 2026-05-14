/*
 * Họ và tên: Hồ Quốc Bảo
 * MSSV: 2123110096
 * Ngày tạo: 14/05/2026
 * version: 1.0
 */

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Data.Entities
{
    public class User
    {
        public int Id { get; set; }// Mã người dùng
        public string Username { get; set; }// Tên đăng nhập
        public string PasswordHash { get; set; }// Mật khẩu đã được băm
        public string FullName { get; set; }// Họ và tên đầy đủ
        public string Role { get; set; } // Quản trị viên hoặc Biên tập viên
    }
}
