using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    public class AttendancerequestController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        //  // private readonly AttendanceDbContext _context;

        private readonly ApplicationDbContext _context;

        //public AttendanceRequestController(AttendanceDbContext context)
        //{
        //    _context = context;
        //}

        public AttendancerequestController(ApplicationDbContext context)
        {
            _context = context;
        }


        // GET: api/AttendanceRequest
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendancerequest>>> GetAttendanceRequests()
        {
            return await _context.Attendancerequests
                .Include(ar => ar.User) // Including user details
                .ToListAsync();
        }

        // GET: api/AttendanceRequest/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Attendancerequest>> GetAttendanceRequest(int id)
        {
            var request = await _context.Attendancerequests
                .Include(ar => ar.User)
                .FirstOrDefaultAsync(ar => ar.Id == id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // POST: api/AttendanceRequest
        [HttpPost]
        public async Task<ActionResult<Attendancerequest>> CreateAttendanceRequest(Attendancerequest request)
        {
            if (request.UserId == null)
            {
                return BadRequest("User ID is required.");
            }

            request.Status = "Pending"; // Default status
            request.CreatedAt = DateTime.UtcNow;
            request.UpdatedAt = DateTime.UtcNow;

            _context.Attendancerequests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAttendanceRequest), new { id = request.Id }, request);
        }

        // PUT: api/AttendanceRequest/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAttendanceRequest(int id, Attendancerequest request)
        {
            if (id != request.Id)
            {
                return BadRequest("Request ID mismatch.");
            }

            var existingRequest = await _context.Attendancerequests.FindAsync(id);
            if (existingRequest == null)
            {
                return NotFound();
            }

            existingRequest.Status = request.Status;
            existingRequest.Remarks = request.Remarks;
            existingRequest.UpdatedAt = DateTime.UtcNow;

            _context.Entry(existingRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendanceRequestExists(id))
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

        // DELETE: api/AttendanceRequest/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAttendanceRequest(int id)
        {
            var request = await _context.Attendancerequests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Attendancerequests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttendanceRequestExists(int id)
        {
            return _context.Attendancerequests.Any(e => e.Id == id);
        }


    }
}
