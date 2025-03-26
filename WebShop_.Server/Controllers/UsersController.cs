using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShop_.Server.Data;
using WebShop_.Server.Models;

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
    }
}
