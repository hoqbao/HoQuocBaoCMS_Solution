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
    public class Category
    {
        public int Id { get; set; } // Mã danh mục
        public string Name { get; set; } // Tên danh mục (vd: Tin Giáo Dục)
        public string Description { get; set; } // Mô tả ngắn về danh mục

        // Quan hệ: Một danh mục có nhiều bài viết
        public virtual ICollection<Post> Posts { get; set; } // Danh sách bài viết thuộc danh mục này
    }
}
