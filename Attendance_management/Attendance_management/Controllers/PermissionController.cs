using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PermissionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Permission
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permission>>> GetPermissions()
        {
            try
            {
                var permissions = await _context.Permissions
                    
                    .ToListAsync();

                if (permissions == null || permissions.Count == 0)
                {
                    return NotFound("No permissions found.");
                }

                return Ok(permissions);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/Permission/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Permission>> GetPermission(int id)
        {
            try
            {
                var permission = await _context.Permissions
                    
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (permission == null)
                {
                    return NotFound($"Permission with ID {id} not found.");
                }

                return Ok(permission);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // POST: api/Permission
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

            return CreatedAtAction(nameof(GetPermission), new { id = permission.Id }, permission);
        }

        // PUT: api/Permission/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Permission permission)
        {
            if (id != permission.Id)
            {
                return BadRequest("Mismatched ID in request.");
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

        // DELETE: api/Permission/{id}
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
