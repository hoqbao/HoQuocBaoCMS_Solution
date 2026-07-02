/*
Họ và tên: Hồ Quốc Bảo
MSSV: 2123110096
Ngày thực hiện: 5/06/2026
*/

using CMS.Data.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .OrderBy(p => p.Id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct != null
                        ? p.CategoryProduct.Name
                        : "Chưa có danh mục"
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int id)
        {
            var product = await _context.Products
                .Include(p => p.CategoryProduct)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct != null
                        ? p.CategoryProduct.Name
                        : "Chưa có danh mục"
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new
                {
                    message = "Không tìm thấy sản phẩm."
                });
            }

            return Ok(product);
        }

        [HttpGet("latest")]
        public async Task<IActionResult> GetLatestProducts()
        {
            var products = await _context.Products
                .Include(p => p.CategoryProduct)
                .OrderByDescending(p => p.Id)
                .Take(3)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct != null
                        ? p.CategoryProduct.Name
                        : "Chưa có danh mục"
                })
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("hot")]
        public async Task<IActionResult> GetHotProducts()
        {
            var hotProducts = await _context.OrderDetails
                .Include(od => od.Product)
                .ThenInclude(p => p.CategoryProduct)
                .GroupBy(od => new
                {
                    od.Product.Id,
                    od.Product.Name,
                    od.Product.Description,
                    od.Product.Price,
                    od.Product.StockQuantity,
                    od.Product.ImageUrl,
                    od.Product.CategoryProductId,
                    CategoryProductName = od.Product.CategoryProduct != null
                        ? od.Product.CategoryProduct.Name
                        : "Chưa có danh mục"
                })
                .Select(g => new
                {
                    g.Key.Id,
                    g.Key.Name,
                    g.Key.Description,
                    g.Key.Price,
                    g.Key.StockQuantity,
                    g.Key.ImageUrl,
                    g.Key.CategoryProductId,
                    g.Key.CategoryProductName,
                    TotalSold = g.Sum(x => x.Quantity)
                })
                .OrderByDescending(p => p.TotalSold)
                .Take(3)
                .ToListAsync();

            if (hotProducts.Any())
            {
                return Ok(hotProducts);
            }

            var fallbackProducts = await _context.Products
                .Include(p => p.CategoryProduct)
                .OrderByDescending(p => p.Price)
                .Take(3)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.StockQuantity,
                    p.ImageUrl,
                    p.CategoryProductId,
                    CategoryProductName = p.CategoryProduct != null
                        ? p.CategoryProduct.Name
                        : "Chưa có danh mục",
                    TotalSold = 0
                })
                .ToListAsync();

            return Ok(fallbackProducts);
        }
    }
}