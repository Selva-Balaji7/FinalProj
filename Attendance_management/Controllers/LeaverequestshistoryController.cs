using Attendance_management.Data;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaverequestshistoryController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LeaverequestshistoryController(ApplicationDbContext context)
        {
            _context = context;
        }

<<<<<<< HEAD
        // GET: api/Leaverequestshistories - G`et all leave requests
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Leaverequest>>> GetLeaveRequests([FromQuery] string role)
        //{
        //    if (role == "null")
        //        return await _context.Leaverequestshistories
        //                         //.Include(l => l.User)s
        //                         .Select(l => new Leaverequest
        //                         {
        //                             Id = l.Id,
        //                             Date = l.Date,
        //                             LeaveType = new Leavetype
        //                             {
        //                                 Name = l.LeaveType.Name
        //                             },
        //                             User = new User
        //                             {
        //                                 Id = l.User.Id,
        //                                 Name = l.User.Name
        //                             },
        //                             Reason = l.Reason,
        //                             Status = l.Status,
        //                             CreatedAt = l.CreatedAt
        //                         })
        //                         .ToListAsync();
        //    else
        //        return await _context.Leaverequestshistories
        //                .Where(l => l.User.Role == role)
        //                .Select(l => new Leaverequest
        //                {
        //                    Id = l.Id,
        //                    Date = l.Date,
        //                    LeaveType = new Leavetype
        //                    {
        //                        Name = l.LeaveType.Name
        //                    },
        //                    User = new User
        //                    {
        //                        Id = l.User.Id,
        //                        Name = l.User.Name
        //                    },
        //                    Reason = l.Reason,
        //                    Status = l.Status,
        //                    CreatedAt = l.CreatedAt
        //                })
        //                .ToListAsync();
        //}

        // GET: api/Leaverequestshistories/{id} - Get a leave request by ID
=======
        // GET: api/Leaverequesthistories - G`et all leave requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Leaverequesthistory>>> GetLeaveRequests([FromQuery] string role)
        {
           if (role == "null")
               return await _context.Leaverequesthistories
                                //.Include(l => l.User)s
                                .Select(l => new Leaverequesthistory
                                {
                                    Id = l.Id,
                                    Date = l.Date,
                                    LeaveType = new Leavetype
                                    {
                                        Name = l.LeaveType.Name
                                    },
                                    User = new User
                                    {
                                        Id = l.User.Id,
                                        Name = l.User.Name
                                    },
                                    Reason = l.Reason,
                                    Status = l.Status,
                                    CreatedAt = l.CreatedAt
                                })
                                .ToListAsync();
           else
               return await _context.Leaverequesthistories
                       .Where(l => l.User.Role == role)
                       .Select(l => new Leaverequesthistory
                       {
                           Id = l.Id,
                           Date = l.Date,
                           LeaveType = new Leavetype
                           {
                               Name = l.LeaveType.Name
                           },
                           User = new User
                           {
                               Id = l.User.Id,
                               Name = l.User.Name
                           },
                           Reason = l.Reason,
                           Status = l.Status,
                           CreatedAt = l.CreatedAt
                       })
                       .ToListAsync();
        }

        // GET: api/Leaverequesthistories/{id} - Get a leave request by ID
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87

        [HttpGet("check/{id}")]
        public async Task<ActionResult<bool>> checkLeaveHistoryRequest(int id, [FromQuery] string Date)
        {
            var cDate = DateOnly.Parse(Date);

            try
            {
<<<<<<< HEAD
                var leavereq = await _context.Leaverequestshistories
=======
                var leavereq = await _context.Leaverequesthistories
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
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

        [HttpGet("{id}")]
<<<<<<< HEAD
        public async Task<ActionResult<IEnumerator<Leaverequest>>> GetLeaveRequest(int id)
        {
            var leaveRequest = await _context.Leaverequestshistories
                                            .Where(l => l.UserId == id)
=======
        public async Task<ActionResult<IEnumerator<Leaverequesthistory>>> GetLeaveRequest(int id)
        {
            var leaveRequest = await _context.Leaverequesthistories
                                            .Where(l => l.UserId == id)
                                            .Select(l => new Leaverequesthistory
                                            {
                                                Id = l.Id,
                                                LeaveTypeId = l.LeaveTypeId,
                                                Date = l.Date,
                                                LeaveType = new Leavetype
                                                {
                                                    Name = l.LeaveType.Name
                                                },
                                                User = new User
                                                {
                                                    Id = l.User.Id,
                                                    Name = l.User.Name
                                                },
                                                Reason = l.Reason,
                                                Status = l.Status,
                                                CreatedAt = l.CreatedAt
                                            })
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
                                             .ToListAsync();

            if (leaveRequest == null)
            {
                return NotFound();
            }

            return Ok(leaveRequest);
        }

        [HttpGet("Countleaves/{id}")]
        public async Task<ActionResult<int>> getLeaveCount(int id, [FromQuery] string Date)
        {
            var checkDate = DateOnly.Parse(Date);

            try
            {
                var leaves = @"
<<<<<<< HEAD
                Select * from LeaveRequestsHistory l
=======
                Select * from LeaveRequestHistory l
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
                WHERE user_id = {0} 
                    and MONTH({1}) = month(l.date)
                    and YEAR({1}) = YEAR(l.date)
                    and status = 'Accepted'";
<<<<<<< HEAD
                var result = await _context.Leaverequestshistories
            .FromSqlRaw(leaves, id, checkDate)
            .CountAsync();

=======
                var leavecount = await _context.Leaverequesthistories
            .FromSqlRaw(leaves, id, checkDate)
            .CountAsync();

                var result = new
                {
                    count = leavecount
                };

>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
                return Ok(result);
            }
            catch
            {
                return BadRequest();
            }
        }


        //[HttpGet("Countleaves/{id}")]
        //public async Task<ActionResult<int>> getLeaveCount(int id)
        //{
        //    try
        //    {
        //        var leaves = await _context.Leaverequests
        //            .Where(lr => lr.UserId == id)
        //            .ToListAsync();

        //        return Ok(leaves.Count);
        //    }
        //    catch
        //    {
        //        return BadRequest();
        //    }
        //}




<<<<<<< HEAD
        // POST: api/Leaverequestshistories - Create a new leave request
        [HttpPost]
        public async Task<ActionResult<Leaverequest>> PostLeaveRequest(Leaverequestshistory leaveRequest)
=======
        // POST: api/Leaverequesthistories - Create a new leave request
        [HttpPost]
        public async Task<ActionResult<Leaverequest>> PostLeaveRequest(Leaverequesthistory leaveRequest)
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        {
            leaveRequest.CreatedAt = DateTime.UtcNow;
            leaveRequest.UpdatedAt = DateTime.UtcNow;
            //leaveRequest.Status = "Pending";

<<<<<<< HEAD
            _context.Leaverequestshistories.Add(leaveRequest);
=======
            _context.Leaverequesthistories.Add(leaveRequest);
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetLeaveRequest), new { id = leaveRequest.Id }, leaveRequest);
        }

<<<<<<< HEAD
        // PUT: api/Leaverequestshistories/{id} - Update a leave request
=======
        // PUT: api/Leaverequesthistories/{id} - Update a leave request
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutLeaveRequest(int id, Leaverequest leaveRequest)
        //{
        //    if (id != leaveRequest.Id)
        //    {
        //        return BadRequest();
        //    }

        //    leaveRequest.UpdatedAt = DateTime.UtcNow;
        //    _context.Entry(leaveRequest).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
<<<<<<< HEAD
        //        if (!_context.Leaverequestshistories.Any(e => e.Id == id))
=======
        //        if (!_context.Leaverequesthistories.Any(e => e.Id == id))
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

<<<<<<< HEAD
        //// DELETE: api/Leaverequestshistories/{id} - Delete a leave request
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLeaveRequest(int id)
        //{
        //    var leaveRequest = await _context.Leaverequestshistories.FindAsync(id);
=======
        //// DELETE: api/Leaverequesthistories/{id} - Delete a leave request
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteLeaveRequest(int id)
        //{
        //    var leaveRequest = await _context.Leaverequesthistories.FindAsync(id);
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        //    if (leaveRequest == null)
        //    {
        //        return NotFound();
        //    }

<<<<<<< HEAD
        //    _context.Leaverequestshistories.Remove(leaveRequest);
=======
        //    _context.Leaverequesthistories.Remove(leaveRequest);
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}
    }
}
