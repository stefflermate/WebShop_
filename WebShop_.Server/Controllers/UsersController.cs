using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShop_.Server.Data;
using WebShop_.Server.Models;
using BCrypt.Net;


namespace WebShop_.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UsersController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _context.Users
                .Include(u => u.Seller)
                .ToListAsync();

            return Ok(users);
        }

        // GET: api/Users/sellers
        [HttpGet("sellers")]
        public async Task<ActionResult<IEnumerable<Seller>>> GetSellers()
        {
            return await _context.Sellers
                .Include(s => s.User)
                .ToListAsync();
        }

        // GET: api/Users/products
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products
                .Include(p => p.Seller).ThenInclude(s => s.User)
                .Include(p => p.Category)
                .ToListAsync();
        }

        // GET: api/Users/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories
                .Include(c => c.SubCategories)
                .ToListAsync();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                return BadRequest("Ez az email már foglalt.");
            }

            var user = new User
            {
                Name = registerDto.Username,
                Email = registerDto.Email,
                Role = registerDto.IsCompany ? "Retailer" : "Customer",
                ZipCode = registerDto.Zipcode,
                CreatedAt = DateTime.Now,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.Password)
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Ha cég, akkor a Seller táblába is szúrunk
            if (registerDto.IsCompany)
            {
                var seller = new Seller
                {
                    UserId = user.Id,
                    Address = registerDto.Address!
                };

                _context.Sellers.Add(seller);
                await _context.SaveChangesAsync();
            }

            return Ok(new { Message = "Sikeres regisztráció" });
        }

        // DTO osztály a bejövő adatokhoz
        public class RegisterDto
        {
            public string Username { get; set; } = string.Empty;
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
            public string Zipcode { get; set; } = string.Empty;
            public string? Address { get; set; }
            public bool IsCompany { get; set; }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var user = await _context.Users
                    .Include(u => u.Seller)
                    .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    return Unauthorized("Hibás email vagy jelszó.");
                }

                return Ok(new
                {
                    user.Id,
                    user.Name,
                    user.Email,
                    user.Role
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine("🔥 Login error: " + ex.Message);
                Console.WriteLine("📄 StackTrace: " + ex.StackTrace);
                return StatusCode(500, "Belső hiba történt a bejelentkezés során.");
            }
        }


        public class LoginDto
        {
            public string Email { get; set; } = string.Empty;
            public string Password { get; set; } = string.Empty;
        }


    }
}
