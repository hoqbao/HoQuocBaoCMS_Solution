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
    public class Order
    {
        [Key]
        public int Id { get; set; }// Khóa chính

        public DateTime OrderDate { get; set; } = DateTime.Now;

        public int CustomerId { get; set; }// Khóa ngoại liên kết tới Customer

        public int Status { get; set; } // 0: Chờ duyệt, 1: Đang giao, 2: Đã xong

        public string? Notes { get; set; }// Ghi chú thêm về đơn hàng

        [ForeignKey("CustomerId")]
        public virtual Customer? Customer { get; set; }// Thông tin khách hàng đặt hàng

        public virtual ICollection<OrderDetail>? OrderDetails { get; set; }// Danh sách chi tiết đơn hàng (sản phẩm, số lượng, giá)
    }
}
