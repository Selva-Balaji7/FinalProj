using System.Globalization;
using Attendance_management.Data;
using Attendance_management.Models;
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

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllAttendancerequestsCount()
        {
            var attendancerequests = await _context.Attendancerequests.ToListAsync();
            return Ok(attendancerequests);
        }

        [HttpGet("count")]
        public async Task<ActionResult<int>> GetAllAttendancerequests()
        {
            var attendancerequests = await _context.Attendancerequests.ToListAsync();
            return Ok(attendancerequests.Count);
        }

        //[HttpGet("limit/{count}")]
        //public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetLimitAttendancerequest(int count, [FromQuery] string startDate, [FromQuery] string endDate, [FromQuery] string role, [FromQuery] string status)
        //{
        //    Console.Clear();
        //    var roleList = role == "null" ? new List<string> { "Student", "Teacher", "Admin" } : new List<string> { role };
        //    var statusList = (status == "null") ? new List<string> { "Present", "Holiday", "Sunday", "Leave" } : new List<string> { status };

        //    if (startDate == "null" || endDate == "null")
        //    {
        //        var attendancerequests = await _context.Attendancerequests
        //            .Where(a => statusList.Contains(a.Status) && roleList.Contains(a.User.Role))
        //            .OrderByDescending(a => a.Date)
        //            .Skip((count - 1) * 10)
        //            .Take(10)
        //            .ToListAsync();
        //        return Ok(attendancerequests);
        //    }
        //    else
        //    {
        //        var sDate = DateOnly.Parse(startDate);
        //        var eDate = DateOnly.Parse(endDate);

        //        var attendancerequests = await _context.Attendancerequests
        //            .Where(a => a.Date >= sDate && a.Date <= eDate && statusList.Contains(a.Status) && roleList.Contains(a.User.Role))
        //            .OrderByDescending(a => a.Date)
        //            .Skip((count - 1) * 10)
        //            .Take(10)
        //            .ToListAsync();
        //        return Ok(attendancerequests);
        //    }
        //}

        ///api/AttendanceRequest?role=Teacher
        /////http://your-api-base-url/api/AttendanceRequest?role=Teacher&userId=5


        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllAttendancerequestsCount([FromQuery] string role)
        //{
        //    if (string.IsNullOrEmpty(role))
        //    {
        //        return BadRequest("Role is required.");
        //    }

        //    // Fetch only attendance requests for 'Teacher' and 'Student' roles
        //    var attendancerequests = await _context.Attendancerequests
        //        .Include(a => a.User)
        //        .Where(a => a.User != null && (a.User.Role == "Teacher" || a.User.Role == "Student"))
        //        .Where(a => a.User.Role== role) // Filters only requested role
        //        .ToListAsync();

        //    if (!attendancerequests.Any())
        //    {
        //        return NotFound("No attendance requests found for the specified role.");
        //    }

        //    return Ok(attendancerequests);
        //}


        [HttpGet("byrole")]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllAttendancerequestsCount(
    [FromQuery] string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                return BadRequest("Role is required.");
            }

            // Fetch attendance requests where User has the specified role
            //var query = from ar in _context.Attendancerequests
            //            join u in _context.Users on ar.UserId equals u.Id
            //            where (u.Role == "Teacher" || u.Role == "Student")
            //                  && u.Role == role
            //            select ar;

            var attendancereq = await _context.Attendancerequests
                .Where(p => p.User.Role == role)
                .Select(p => new Attendancerequest
                {
                    UserId = p.UserId,
                    Date = p.Date,
                    Status = p.Status,
                    Remarks = p.Remarks,
                    User = new User
                    {
                        Role = p.User.Role
                    }
                })
                .ToListAsync();

            //if (userId.HasValue)
            //{
            //    query = query.Where(a => a.UserId == userId.Value);
            //}
            if(attendancereq == null)
            {
                return NotFound("No attendace request Found");
            }

            //var attendancerequests = await query.ToListAsync();

            //if (!attendancerequests.Any())
            //{
            //    return NotFound("No attendance requests found for the specified role.");
            //}

            return Ok(attendancereq);
        }






        [HttpGet("{id}")]
        public async Task<ActionResult<Attendancerequest>> GetAttendancerequest(int id)
        {
            var attendancerequest = await _context.Attendancerequests
                .Where(a => a.UserId == id)
                .OrderByDescending(a => a.Date)
                .ToListAsync();

            if (attendancerequest == null)
            {
                return NotFound();
            }
            return Ok(attendancerequest);
        }


        [HttpPost]
        public async Task<ActionResult> AddAttendance(Attendancerequest attendancerequest)
        {
            var newAttendancerequest = new Attendancerequest
            {
                UserId = attendancerequest.UserId,
                Date = attendancerequest.Date,
                Status = attendancerequest.Status,
                Remarks = attendancerequest.Remarks,
                // CreatedAt = DateTime.UtcNow,
                //  UpdatedAt = DateTime.UtcNow
            };

            _context.Attendancerequests.Add(newAttendancerequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendancerequest", new { id = newAttendancerequest.Id }, newAttendancerequest);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAttendancerequest(int id, Attendancerequest updatedAttendancerequest)
        {
            if (id != updatedAttendancerequest.Id)
            {
                return BadRequest();
            }

            _context.Entry(updatedAttendancerequest).State = EntityState.Modified;
            updatedAttendancerequest.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                var exists = await _context.Attendancerequests.AnyAsync(a => a.Id == id);
                if (!exists)
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
        public async Task<ActionResult> DeleteAttendancerequest(int id)
        {
            var attendancerequest = await _context.Attendancerequests.FindAsync(id);
            if (attendancerequest == null)
            {
                return NotFound();
            }

            _context.Attendancerequests.Remove(attendancerequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
