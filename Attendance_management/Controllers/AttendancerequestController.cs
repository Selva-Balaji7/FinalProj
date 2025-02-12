using Attendance_management.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AttendancerequestController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AttendancerequestController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet("check/{id}")]
        public async Task<ActionResult<bool>> checkAttendanceRequest(int id, [FromQuery] string Date)
        {
            var cDate = DateOnly.Parse(Date);

            try
            {
                var leavereq = await _context.Attendancerequests
                    .Where(lr => lr.UserId == id && lr.Date == cDate)
                    .ToListAsync();

                if (leavereq.Count == 0)
                {
                    return Ok(true);
                }
                else
                {
                    return Ok(false);
                }
            }
            catch
            {
                return BadRequest(false);
            }


        }
    }
}
