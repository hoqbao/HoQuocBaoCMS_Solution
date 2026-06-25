/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 15/05/2026
*/

using CMS.Data.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

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

        public IActionResult Index(int? id, int page = 1)
        {
            int pageSize = 10;

            if (page < 1)
            {
                page = 1;
            }

            var postsQuery = _context.Posts
                .Include(p => p.Category)
                .AsQueryable();

            if (id != null)
            {
                postsQuery = postsQuery.Where(p => p.CategoryId == id);
            }

            var totalItems = postsQuery.Count();

            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var posts = postsQuery
                .OrderByDescending(p => p.CreatedDate)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            ViewBag.CurrentPage = page;
            ViewBag.TotalPages = totalPages;
            ViewBag.TotalItems = totalItems;
            ViewBag.CategoryId = id;

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
            LoadCategoryList();

            return View(new Post
            {
                CreatedDate = DateTime.Now
            });
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Post model, IFormFile? uploadImage)
        {
            if (model == null)
            {
                ModelState.AddModelError("", "Dữ liệu bài viết không hợp lệ.");
                LoadCategoryList();

                return View(new Post
                {
                    CreatedDate = DateTime.Now
                });
            }

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
                model.ImageUrl = SaveUploadImage(uploadImage);
            }

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryId);
                return View(model);
            }

            _context.Posts.Add(model);
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var post = _context.Posts.Find(id);

            if (post == null)
            {
                return NotFound();
            }

            LoadCategoryList(post.CategoryId);

            return View(post);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Edit(Post model, IFormFile? uploadImage)
        {
            if (model == null)
            {
                ModelState.AddModelError("", "Dữ liệu bài viết không hợp lệ.");
                LoadCategoryList();

                return View(new Post
                {
                    CreatedDate = DateTime.Now
                });
            }

            ModelState.Remove("Category");
            ModelState.Remove("ImageUrl");
            ModelState.Remove("uploadImage");

            if (model.CategoryId == 0)
            {
                ModelState.AddModelError("CategoryId", "Vui lòng chọn danh mục.");
            }

            var oldPost = _context.Posts
                .AsNoTracking()
                .FirstOrDefault(p => p.Id == model.Id);

            if (oldPost == null)
            {
                return NotFound();
            }

            if (model.CreatedDate == default)
            {
                model.CreatedDate = oldPost.CreatedDate;
            }

            if (uploadImage != null && uploadImage.Length > 0)
            {
                model.ImageUrl = SaveUploadImage(uploadImage);
            }
            else
            {
                model.ImageUrl = oldPost.ImageUrl;
            }

            if (!ModelState.IsValid)
            {
                LoadCategoryList(model.CategoryId);
                return View(model);
            }

            _context.Posts.Update(model);
            _context.SaveChanges();

            return RedirectToAction(nameof(Index));
        }

        public IActionResult Delete(int id)
        {
            var post = _context.Posts.Find(id);

            if (post != null)
            {
                _context.Posts.Remove(post);
                _context.SaveChanges();
            }

            return RedirectToAction(nameof(Index));
        }

        private void LoadCategoryList(int? selectedId = null)
        {
            ViewBag.CategoryList = new SelectList(
                _context.Categories.OrderBy(c => c.Name).ToList(),
                "Id",
                "Name",
                selectedId
            );
        }

        private string SaveUploadImage(IFormFile uploadImage)
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

            return "/uploads/" + fileName;
        }
    }
}