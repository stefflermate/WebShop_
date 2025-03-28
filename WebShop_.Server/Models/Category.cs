using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebShop_.Server.Models
{
    [Table("Categories")]
    public class Category
    {
        public int Id { get; set; }

        [Required]
        public required string Name { get; set; }

        // ❌ Ezeket el kell távolítani:
        // public int? ParentId { get; set; }
        // public Category? Parent { get; set; }

        // ✅ Marad csak a SubCategory kapcsolat
        public ICollection<SubCategory>? SubCategories { get; set; }
    }
}
