using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class PermissionController : Controller
    {

        private readonly ApplicationDbContext _context;

        public PermissionController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Permission>>> GetPermissions()
        {
            try
            {
                var permissions = await _context.Permissions
                    .Include(p => p.Role)
                    .Select(p => new Permission
                    {
                        RoleId = p.RoleId,
                       PermissionName=p.PermissionName,
                       Role = new Role
                       {
                           RoleName = p.Role.RoleName
                       }
                    })
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
                    .Include(p => p.Role)
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



    }
}
