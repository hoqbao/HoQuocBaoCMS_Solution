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
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }// Khóa chính

        public int OrderId { get; set; }// Khóa ngoại liên kết tới Order

        public int ProductId { get; set; }// Khóa ngoại liên kết tới Product

        public int Quantity { get; set; }// Số lượng sản phẩm trong đơn hàng

        [Column(TypeName = "decimal(18,2)")]
        public decimal UnitPrice { get; set; } // Giá tại thời điểm mua

        [ForeignKey("OrderId")]
        public virtual Order? Order { get; set; }// Thông tin đơn hàng chứa chi tiết này

        [ForeignKey("ProductId")]
        public virtual Product? Product { get; set; }// Thông tin sản phẩm được đặt trong chi tiết đơn hàng này
    }
}
