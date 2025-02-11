using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestHistoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LeaveRequestHistoryController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveRequestHistory - Get leave request history for the logged-in user
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leaverequest>>> GetLeaveRequestHistory()
        {
            // Extract user ID from claims (assuming authentication is implemented)
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated");
            }

            int userId = int.Parse(userIdClaim.Value);

            // Fetch leave request history for the logged-in user
            var leaveRequests = await _context.Leaverequests
                .Where(l => l.UserId == userId)
                .OrderByDescending(l => l.CreatedAt) // Sort by most recent first
                .ToListAsync();

            return Ok(leaveRequests);
        }
    }
}