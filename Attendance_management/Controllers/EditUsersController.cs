using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Attendance_management.Data;
using Attendance_management.Models;

[ApiController]
[Route("api/[controller]")]
public class EditUsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EditUsersController(ApplicationDbContext context)
    {
        _context = context;
    }
    //Get:api/
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // GET: api/admin/edit-users/{id}
    [HttpGet("{id}")]                                                                       
    public async Task<IActionResult> GetUserById(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        return Ok(user);
    }

    // PUT: api/admin/edit-users/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        user.Name = updatedUser.Name;
        user.Email = updatedUser.Email;
        user.Password = updatedUser.Password;
        user.Role = updatedUser.Role;
        user.ProfilePicture = updatedUser.ProfilePicture;
        user.CreatedAt = updatedUser.CreatedAt;
        user.UpdatedAt = updatedUser.UpdatedAt;
        await _context.SaveChangesAsync();
        return Ok(new { message = "User updated successfully" });
    }

    // DELETE: api/admin/edit-users/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound(new { message = "User not found" });
        }
        var attendanceRecords = _context.Attendances.Where(a => a.UserId == id);
        _context.Attendances.RemoveRange(attendanceRecords);


        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User deleted successfully" });
    }
}
