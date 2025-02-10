using Microsoft.AspNetCore.Mvc;

using Attendance_management.Data;
using Microsoft.EntityFrameworkCore;
using Attendance_management.Models;

using System;
using System.Linq;
using System.Threading.Tasks;


namespace Attendance_management.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AttendancerequestController : Controller
    {

        private readonly ApplicationDbContext _context;

        public AttendancerequestController(ApplicationDbContext context)
        {
            _context = context;
        }

       

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllrequests()
        {
            var attendancerequestsAll = await _context.Attendancerequests.ToListAsync();
            return Ok(attendancerequestsAll);
        }




        [HttpGet("{id}")]
        public async Task<ActionResult<Attendancerequest>> GetAttendancerequestById(int id)
        {
            var attendancerequestsById = await _context.Attendancerequests
                .Where(a => a.UserId == id)
                .OrderByDescending(a => a.Date)
                .ToListAsync();

            if (attendancerequestsById == null)
            {
                return NotFound();
            }
            return Ok(attendancerequestsById);
        }


        [HttpPost]
        public async Task<ActionResult> AddAttendance(Attendancerequest attendancerequest)
        {
            var newAttendancerequest = new Attendancerequest
            {
                //UserId = attendance.UserId,
                Date = attendancerequest.Date,
                Status = attendancerequest.Status,
                Remarks = attendancerequest.Remarks,
                //CreatedAt = DateTime.UtcNow,
                // UpdatedAt = DateTime.UtcNow
            };

            _context.Attendancerequests.Add(newAttendancerequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendance", new { id = newAttendancerequest.Id }, newAttendancerequest);
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
                var attendancerequestExists = await _context.Attendancerequests.AnyAsync(a => a.Id == id);
                if (!attendancerequestExists)
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
        public async Task<ActionResult> DeleteAttendance(int id)
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




        // GET: api/Attendancerequest/{id}
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetRequestById(int id)
        //{
        //    var request = await _context.Attendancerequests
        //        .Include(a => a.User)
        //        .FirstOrDefaultAsync(a => a.Id == id);

        //    if (request == null)
        //        return NotFound(new { message = "Attendance request not found" });

        //    return Ok(request);
        //}

        //// POST: api/Attendancerequest (Create new request)
        //[HttpPost]
        //public async Task<IActionResult> CreateRequest([FromBody] Attendancerequest request)
        //{
        //    if (request == null)
        //        return BadRequest(new { message = "Invalid data" });

        //    request.Status = "Pending";
        //    request.CreatedAt = DateTime.UtcNow;
        //    request.UpdatedAt = DateTime.UtcNow;

        //    _context.Attendancerequests.Add(request);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction(nameof(GetRequestById), new { id = request.Id }, request);
        //}

        // PUT: api/Attendancerequest/{id} (Update request status)
        //    [HttpPut("{id}")]
        //    public async Task<IActionResult> UpdateRequest(int id, [FromBody] Attendancerequest updatedRequest)
        //    {
        //        var request = await _context.Attendancerequests.FindAsync(id);
        //        if (request == null)
        //            return NotFound(new { message = "Attendance request not found" });

        //        request.Status = updatedRequest.Status;
        //        request.Remarks = updatedRequest.Remarks;
        //        request.UpdatedAt = DateTime.UtcNow;

        //        _context.Attendancerequests.Update(request);
        //        await _context.SaveChangesAsync();

        //        return Ok(request);
        //    }

        //    // DELETE: api/Attendancerequest/{id}
        //    [HttpDelete("{id}")]
        //    public async Task<IActionResult> DeleteRequest(int id)
        //    {
        //        var request = await _context.Attendancerequests.FindAsync(id);
        //        if (request == null)
        //            return NotFound(new { message = "Attendance request not found" });

        //        _context.Attendancerequests.Remove(request);
        //        await _context.SaveChangesAsync();

        //        return Ok(new { message = "Attendance request deleted successfully" });
        //    }
        }

    }
