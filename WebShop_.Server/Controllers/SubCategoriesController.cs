using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebShop_.Server.Data;
using WebShop_.Server.Models;

namespace WebShop_.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoriesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SubCategoriesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/SubCategories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetAll()
        {
            var subcategories = await _context.SubCategories
                .Include(sc => sc.Category)
                .ToListAsync();

            return Ok(subcategories);
        }

        // GET: api/SubCategories/by-category/5
        [HttpGet("by-category/{categoryId}")]
        public async Task<ActionResult<IEnumerable<SubCategory>>> GetByCategory(int categoryId)
        {
            var subcategories = await _context.SubCategories
                .Where(sc => sc.CategoryId == categoryId)
                .ToListAsync();

            return Ok(subcategories);
        }
    }
}
