using Attendance_management.Data;
<<<<<<< HEAD
=======
using Attendance_management.Models;
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
<<<<<<< HEAD
    public class AttendancerequestController : Controller
=======
    public class AttendancerequestController : ControllerBase
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
    {
        private readonly ApplicationDbContext _context;

        public AttendancerequestController(ApplicationDbContext context)
        {
            _context = context;
        }

<<<<<<< HEAD
=======
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllAttendancerequestsCount()
        {
            var attendancerequests = await _context.Attendancerequests
                .Select(p => new Attendancerequest
                {
                    Id = p.Id,
                    UserId = p.UserId,
                    Date = p.Date,
                    Status = p.Status,
                    Remarks = p.Remarks,
                    User = new User
                    {
                        Name = p.User.Name,
                        Role = p.User.Role
                    }
                })
                .ToListAsync();
            return Ok(attendancerequests);
        }



        [HttpGet("byrole")]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAllAttendancerequestsCount(
    [FromQuery] string role)
        {
            if (string.IsNullOrEmpty(role))
            {
                return BadRequest("Role is required.");
            }


            var attendancereq = await _context.Attendancerequests
                .Where(p => p.User.Role == role)
                .Select(p => new Attendancerequest
                {
                    Id = p.Id,
                    UserId = p.UserId,
                    Date = p.Date,
                    Status = p.Status,
                    Remarks = p.Remarks,
                    User = new User
                    {
                        Name = p.User.Name,
                        Role = p.User.Role
                    }
                })
                .ToListAsync();

            if (attendancereq == null)
            {
                return NotFound("No attendace request Found");
            }


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


>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        [HttpGet("check/{id}")]
        public async Task<ActionResult<bool>> checkAttendanceRequest(int id, [FromQuery] string Date)
        {
            var cDate = DateOnly.Parse(Date);

            try
            {
<<<<<<< HEAD
                var leavereq = await _context.Attendancerequests
                    .Where(lr => lr.UserId == id && lr.Date == cDate)
                    .ToListAsync();

                if (leavereq.Count == 0)
=======
                var attreq = await _context.Attendancerequests
                    .Where(ar => ar.UserId == id && ar.Date == cDate)
                    .ToListAsync();

                if (attreq.Count == 0)
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
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
<<<<<<< HEAD


        }
=======
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


>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
    }
}
