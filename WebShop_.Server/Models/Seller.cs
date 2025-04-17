using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebShop_.Server.Models
{
    [Table("Sellers")]
    public class Seller
    {
        [Key, ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public required string Address { get; set; }

        [Required]
        public required string PhoneNumber { get; set; }

        [Required]
        public required string OpeningHours { get; set; }

        [MaxLength(2000)]
        public string? Description { get; set; }

        public User User { get; set; }
    }
}
