using CMS.Data.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS.Backend.Controllers
{
    [Authorize]
    public class OrderDetailController : Controller
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index(int? orderId)
        {
            var query = _context.OrderDetails
                .Include(od => od.Order)
                    .ThenInclude(o => o.Customer)
                .Include(od => od.Product)
                .AsQueryable();

            if (orderId != null)
            {
                query = query.Where(od => od.OrderId == orderId);
                ViewBag.OrderId = orderId;
            }

            var details = query
                .OrderBy(od => od.Id)
                .ToList();

            return View(details);
        }

        public IActionResult Delete(int id)
        {
            var detail = _context.OrderDetails.Find(id);

            if (detail != null)
            {
                _context.OrderDetails.Remove(detail);
                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
    }
}