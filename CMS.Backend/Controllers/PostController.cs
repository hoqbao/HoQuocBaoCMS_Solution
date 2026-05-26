/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 15/05/2026
*/

using CMS.Data.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
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
    }
}