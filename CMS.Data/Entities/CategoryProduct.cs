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

    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }// Khóa chính, tự động tăng

        [Required(ErrorMessage = "Tên danh mục không được để trống")]
        [StringLength(100)]
        public string Name { get; set; }// Tên danh mục sản phẩm (vd: Điện tử, Thời trang)

        public string? Description { get; set; } // Mô tả ngắn về danh mục sản phẩm

        // Quan hệ: Một danh mục có nhiều sản phẩm
        public virtual ICollection<Product>? Products { get; set; }// Danh sách sản phẩm thuộc danh mục này
    }
}
