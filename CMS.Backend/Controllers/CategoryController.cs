using Microsoft.AspNetCore.Mvc;
using CMS.Data.Entities; // Kết nối tới lớp dữ liệu bạn vừa tạo

public class CategoryController : Controller
{
    public IActionResult Index()
    {
        // Tạo danh sách dữ liệu mẫu trực tiếp trong code
        var list = new List<Category> {
            new Category { Id = 1, Name = "Công Nghệ Thông Tin", Description = "Lập trình, Thiết kế đồ họa" },
            new Category { Id = 2, Name = "Công Nghệ Ô tô", Description = "Sữa chữa ô tô" }
        };
        return View(list); // Gửi danh sách này sang giao diện
    }
}
