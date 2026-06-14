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
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var posts = await _context.Posts
                .OrderBy(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa có danh mục"
                })
                .ToListAsync();

            return Ok(posts);
        }

        // GET: api/Posts/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var post = await _context.Posts
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.Content,
                    p.ImageUrl,
                    p.CreatedDate,
                    p.CategoryId,
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa có danh mục"
                })
                .FirstOrDefaultAsync();

            if (post == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy bài viết này trong hệ thống"
                });
            }

            return Ok(post);
        }

        // GET: api/Posts/category/1
        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetByCategory(int categoryId)
        {
            var posts = await _context.Posts
                .Where(p => p.CategoryId == categoryId)
                .OrderByDescending(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Title,
                    p.ImageUrl,
                    p.CreatedDate,
                    CategoryName = p.Category != null ? p.Category.Name : "Chưa có danh mục"
                })
                .ToListAsync();

            return Ok(posts);
        }
    }
}