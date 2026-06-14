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
    public class ProductController : Controller
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var products = _context.Products
                .Include(p => p.CategoryProduct)
                .OrderBy(p => p.Id)
                .ToList();

            return View(products);
        }

        [HttpGet]
        public IActionResult Create()
        {
            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name"
            );

            return View();
        }

        [HttpPost]
        public IActionResult Create(Product model, IFormFile? uploadImage)
        {
            ModelState.Remove("CategoryProduct");
            ModelState.Remove("ImageUrl");
            ModelState.Remove("uploadImage");

            if (model.CategoryProductId == 0)
            {
                ModelState.AddModelError("CategoryProductId", "Vui lòng chọn danh mục sản phẩm.");
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
                _context.Products.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                model.CategoryProductId
            );

            return View(model);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var product = _context.Products.Find(id);

            if (product == null)
            {
                return NotFound();
            }

            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                product.CategoryProductId
            );

            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(Product model, IFormFile? uploadImage)
        {
            ModelState.Remove("CategoryProduct");
            ModelState.Remove("ImageUrl");
            ModelState.Remove("uploadImage");

            if (model.CategoryProductId == 0)
            {
                ModelState.AddModelError("CategoryProductId", "Vui lòng chọn danh mục sản phẩm.");
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
            else
            {
                var oldProduct = _context.Products
                    .AsNoTracking()
                    .FirstOrDefault(p => p.Id == model.Id);

                if (oldProduct != null)
                {
                    model.ImageUrl = oldProduct.ImageUrl;
                }
            }

            if (ModelState.IsValid)
            {
                _context.Products.Update(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            ViewBag.CategoryProductList = new SelectList(
                _context.CategoriesProducts.ToList(),
                "Id",
                "Name",
                model.CategoryProductId
            );

            return View(model);
        }

        public IActionResult Delete(int id)
        {
            var product = _context.Products.Find(id);

            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}