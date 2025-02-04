using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRegistrationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserRegistrationController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/users - Get all users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usersregistration>>> GetUsers()
        {
            return await _context.Usersregistrations.ToListAsync();
        }
        
        // GET: api/users/{id} - Get user by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Usersregistration>> GetUser(int id)
        {
            var user = await _context.Usersregistrations.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/users - Create new user
        [HttpPost]
        public async Task<ActionResult<Usersregistration>> PostUser(Usersregistration user)
        {
            _context.Usersregistrations.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/users/{id} - Update user details
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, Usersregistration user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Usersregistrations.Any(e => e.Id == id))
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

        // DELETE: api/users/{id} - Delete user by ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Usersregistrations.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Usersregistrations.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
