﻿using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveRequestsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LeaveRequestsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/LeaveRequests - Get all leave requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leaverequest>>> GetLeaveRequests()
        {
            return await _context.Leaverequests
                                 .Include(l => l.User)
                                 .Include(l => l.LeaveType)
                                 .ToListAsync();
        }

        // GET: api/LeaveRequests/{id} - Get a leave request by ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Leaverequest>> GetLeaveRequest(int id)
        {
            var leaveRequest = await _context.Leaverequests
                                             .Include(l => l.User)
                                             .Include(l => l.LeaveType)
                                             .FirstOrDefaultAsync(l => l.Id == id);

            if (leaveRequest == null)
            {
                return NotFound();
            }

            return leaveRequest;
        }

        // POST: api/LeaveRequests - Create a new leave request
        [HttpPost]
        public async Task<ActionResult<Leaverequest>> PostLeaveRequest(Leaverequest leaveRequest)
        {
            leaveRequest.CreatedAt = DateTime.UtcNow;
            leaveRequest.UpdatedAt = DateTime.UtcNow;
            leaveRequest.Status = "Pending";

            _context.Leaverequests.Add(leaveRequest);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, leaveRequest);
        }

        // PUT: api/LeaveRequests/{id} - Update a leave request
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLeaveRequest(int id, Leaverequest leaveRequest)
        {
            if (id != leaveRequest.Id)
            {
                return BadRequest();
            }

            leaveRequest.UpdatedAt = DateTime.UtcNow;
            _context.Entry(leaveRequest).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Leaverequests.Any(e => e.Id == id))
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

        // DELETE: api/LeaveRequests/{id} - Delete a leave request
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLeaveRequest(int id)
        {
            var leaveRequest = await _context.Leaverequests.FindAsync(id);
            if (leaveRequest == null)
            {
                return NotFound();
            }

            _context.Leaverequests.Remove(leaveRequest);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

