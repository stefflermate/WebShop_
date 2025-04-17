using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebShop_.Server.Models
{
    [Table("SubCategories")]
    public class SubCategory
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        public ICollection<Product>? Products { get; set; }
    }
}
