using System;

namespace CMS.Data.Entities
{
    public class Post
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Content { get; set; } = string.Empty;

        public string ImageUrl { get; set; } = string.Empty;

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public int CategoryId { get; set; }

        public virtual Category? Category { get; set; }
    }
}