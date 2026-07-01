/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 15/05/2026
*/

using CMS.Data.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class CategoryController : Controller
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var categories = _context.Categories
                .OrderByDescending(c => c.Id)
                .ToList();

            return View(categories);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View(new Category());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Category category)
        {
            if (category == null)
            {
                ModelState.AddModelError("", "Dữ liệu danh mục không hợp lệ.");
                return View(new Category());
            }

            if (string.IsNullOrWhiteSpace(category.Name))
            {
                ModelState.AddModelError("Name", "Vui lòng nhập tên danh mục.");
            }

            if (!ModelState.IsValid)
            {
                return View(category);
            }

            _context.Categories.Add(category);
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var category = _context.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return View(category);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Category category)
        {
            if (category == null)
            {
                ModelState.AddModelError("", "Dữ liệu danh mục không hợp lệ.");
                return View(new Category());
            }

            if (string.IsNullOrWhiteSpace(category.Name))
            {
                ModelState.AddModelError("Name", "Vui lòng nhập tên danh mục.");
            }

            if (!ModelState.IsValid)
            {
                return View(category);
            }

            _context.Categories.Update(category);
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var category = _context.Categories
                .Include(c => c.Posts)
                .FirstOrDefault(c => c.Id == id);

            if (category == null)
            {
                return NotFound();
            }

            if (category.Posts != null && category.Posts.Any())
            {
                TempData["Error"] = "Không thể xóa danh mục này vì đang có bài viết thuộc danh mục.";
                return RedirectToAction(nameof(Index));
            }

            _context.Categories.Remove(category);
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }
    }
}