namespace CMS.Data.Entities
{
    public class Category
    {
        public int Id { get; set; }

        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public virtual ICollection<Post> Posts { get; set; } = new List<Post>();

        public virtual ICollection<CategoryProduct> CategoryProducts { get; set; } = new List<CategoryProduct>();
    }
}