using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebShop_.Server.Models
{
    [Table("Products")]
    public class Product
    {
        public int Id { get; set; }

        public int SellerId { get; set; }
        public Seller? Seller { get; set; }

        public int CategoryId { get; set; }
        public Category? Category { get; set; }

        [Required]
        public required string Name { get; set; }

        public int Quantity { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }

}
