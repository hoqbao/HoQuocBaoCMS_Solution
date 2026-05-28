/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 15/05/2026
*/

using CMS.Data.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class PostController : Controller
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? id)
        {
            var postsQuery = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();

            if (id != null)
            {
                postsQuery = postsQuery.Where(p => p.CategoryId == id);
            }

            var posts = postsQuery
                .OrderByDescending(p => p.CreatedDate)
                .ToList();

            return View(posts);
        }

        public IActionResult Details(int id)
        {
            var post = _context.Posts
                .Include(p => p.Category)
                .FirstOrDefault(p => p.Id == id);

            if (post == null)
            {
                return NotFound();
            }

            return View(post);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryList = new SelectList(_context.Categories.ToList(), "Id", "Name");
            return View();
        }

        [HttpPost]
        public IActionResult Create(Post model, IFormFile? uploadImage)
        {
            ModelState.Remove("Category");
            ModelState.Remove("ImageUrl");
            ModelState.Remove("uploadImage");

            if (model.CategoryId == 0)
            {
                ModelState.AddModelError("CategoryId", "Vui lòng chọn danh mục.");
            }

            if (model.CreatedDate == default)
            {
                model.CreatedDate = DateTime.Now;
            }

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(
                    Directory.GetCurrentDirectory(),
                    "wwwroot",
                    "uploads"
                );

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/" + fileName;
            }

            if (ModelState.IsValid)
            {
                _context.Posts.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            ViewBag.CategoryList = new SelectList(_context.Categories.ToList(), "Id", "Name", model.CategoryId);
            return View(model);
        }
        [HttpPost]
        public IActionResult Edit(User model, string? NewPassword)
        {
            var existingUser = _context.Users
                .AsNoTracking()
                .FirstOrDefault(u => u.Id == model.Id);

            if (existingUser == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(NewPassword))
            {
                model.PasswordHash = NewPassword;
            }
            else
            {
                model.PasswordHash = existingUser.PasswordHash;
            }

            if (ModelState.IsValid)
            {
                _context.Users.Update(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(model);
        }
        [HttpPost]
        public IActionResult Edit(Post model, IFormFile? uploadImage)
        {
            ModelState.Remove("Category");
            ModelState.Remove("ImageUrl");
            ModelState.Remove("uploadImage");

            if (uploadImage != null && uploadImage.Length > 0)
            {
                string folder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads");

                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                string fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadImage.FileName);
                string filePath = Path.Combine(folder, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    uploadImage.CopyTo(stream);
                }

                model.ImageUrl = "/uploads/" + fileName;
            }
            else
            {
                var oldPost = _context.Posts
                    .AsNoTracking()
                    .FirstOrDefault(p => p.Id == model.Id);

                if (oldPost != null && string.IsNullOrEmpty(model.ImageUrl))
                {
                    model.ImageUrl = oldPost.ImageUrl;
                }
            }

            if (ModelState.IsValid)
            {
                _context.Posts.Update(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            ViewBag.CategoryList = new SelectList(_context.Categories, "Id", "Name", model.CategoryId);

            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}