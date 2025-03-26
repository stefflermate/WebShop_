using System.ComponentModel.DataAnnotations;

namespace WebShop_.Server.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(100)]
        public required string Name { get; set; }

        [Required, MaxLength(255), EmailAddress]
        public required string Email { get; set; }

        [Required, MaxLength(50)]
        public required string Role { get; set; }

        public DateTime? CreatedAt { get; set; }

        [MaxLength(10)]
        public string? ZipCode { get; set; }

        [Required]
        public required string PasswordHash { get; set; }

        // Navigációs tulajdonság (explicit módon egyértelműsítsd)
        public Seller? Seller { get; set; }
    }
}
