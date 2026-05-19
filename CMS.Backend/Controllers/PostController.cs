using CMS.Data;
using CMS.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace CMS.Backend.Controllers
{
    public class PostController : Controller
    {
        public IActionResult Index()
        {
            var posts = new List<Post>
            {
                new Post
                {
                    Id = 1,
                    Title = "Lộ trình học ASP.NET Core cho người mới",
                    Content = "Nội dung bài viết về lộ trình học .NET, MVC, Razor View và Entity Framework Core.",
                    ImageUrl = "https://via.placeholder.com/300x180?text=ASP.NET+Core"
                },
                new Post
                {
                    Id = 2,
                    Title = "ReactJS và WebAPI: Xu hướng Fullstack 2026",
                    Content = "Nội dung bài viết về kết hợp ReactJS với ASP.NET Core Web API.",
                    ImageUrl = "https://via.placeholder.com/300x180?text=ReactJS+WebAPI"
                }
            };

            return View(posts);
        }
    }
}