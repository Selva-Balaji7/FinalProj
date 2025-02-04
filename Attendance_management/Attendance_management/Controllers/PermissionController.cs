
using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PermissionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PermissionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permission>>> Get()
        {
            var permissions = await _context.Permissions.Include(p => p.Role).ToListAsync();
            return Ok(permissions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Permission>> Get(int id)
        {
            var permission = await _context.Permissions.Include(p => p.Role)
                .FirstOrDefaultAsync(p => p.Id == id);
            if (permission == null)
                return NotFound();

            return Ok(permission);
        }

        [HttpPost]
        public async Task<ActionResult<Permission>> Post([FromBody] Permission permission)
        {
            if (permission == null)
            {
                return BadRequest("Permission cannot be null.");
            }

            permission.CreatedAt = DateTime.UtcNow;
            _context.Permissions.Add(permission);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = permission.Id }, permission);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Permission permission)
        {
            if (id != permission.Id)
            {
                return BadRequest();
            }

            permission.UpdatedAt = DateTime.UtcNow;
            _context.Entry(permission).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PermissionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var permission = await _context.Permissions.FindAsync(id);
            if (permission == null)
                return NotFound();

            _context.Permissions.Remove(permission);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task<bool> PermissionExists(int id)
        {
            return await _context.Permissions.AnyAsync(e => e.Id == id);
        }
    }
}