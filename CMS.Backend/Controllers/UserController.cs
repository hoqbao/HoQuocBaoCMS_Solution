using CMS.Data.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using CMS.Backend.Helpers;

namespace CMS.Backend.Controllers
{
    [Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private readonly AppDbContext _context;

        public UserController(AppDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var users = _context.Users.ToList();
            return View(users);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(User model)
        {
            var checkExist = _context.Users.Any(u => u.Username == model.Username);

            if (checkExist)
            {
                ModelState.AddModelError("Username", "Tên đăng nhập này đã có người dùng!");
                return View(model);
            }

            if (ModelState.IsValid)
            {
                model.PasswordHash = PasswordHelper.HashPassword(model.PasswordHash);

                _context.Users.Add(model);
                _context.SaveChanges();

                return RedirectToAction("Index");
            }

            return View(model);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return View(user);
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
                model.PasswordHash = PasswordHelper.HashPassword(NewPassword);
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

        public IActionResult Delete(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return RedirectToAction("Index");
        }
    }
}