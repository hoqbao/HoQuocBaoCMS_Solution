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
using System.ComponentModel.DataAnnotations.Schema;

namespace CMS.Data.Entities
{
    public class Product
    {
        [Key]
        public int Id { get; set; }// Khóa chính, tự động tăng

        [Required(ErrorMessage = "Tên sản phẩm không được để trống")]
        public string Name { get; set; }// Tên sản phẩm

        public string? Description { get; set; }// Mô tả chi tiết về sản phẩm

        [Range(0, double.MaxValue)]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Price { get; set; }// Giá sản phẩm

        public int StockQuantity { get; set; }// Số lượng tồn kho của sản phẩm

        public string? ImageUrl { get; set; }// URL hình ảnh sản phẩm

        // Khóa ngoại nối tới CategoryProduct
        public int CategoryProductId { get; set; }// Khóa ngoại liên kết tới CategoryProduct

        [ForeignKey("CategoryProductId")]
        public virtual CategoryProduct? CategoryProduct { get; set; }// Thông tin danh mục sản phẩm mà sản phẩm này thuộc về
    }
}
