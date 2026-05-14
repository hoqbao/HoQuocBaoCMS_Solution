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

using System.ComponentModel.DataAnnotations;

namespace CMS.Data.Entities
{
    // Khách hàng
    public class Customer
    {
        [Key]
        public int Id { get; set; }// Khóa chính

        [Required]
        public string FullName { get; set; }// Họ và tên khách hàng

        [Required]
        [EmailAddress]
        public string Email { get; set; }// Địa chỉ email khách hàng

        public string? Phone { get; set; }// Số điện thoại khách hàng

        public string? Address { get; set; }// Địa chỉ giao hàng của khách hàng

        [Required]
        public string Password { get; set; } // Lưu mật khẩu thô theo yêu cầu tối giản

        public virtual ICollection<Order>? Orders { get; set; }// Danh sách đơn hàng của khách hàng
    }
}
