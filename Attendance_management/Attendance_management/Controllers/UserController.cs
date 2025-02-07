using Microsoft.AspNetCore.Mvc;

using Attendance_management.Data;
using Attendance_management.Models;

using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class UserController : Controller
    {
        //public IActionResult Index()
        //{
        //    return View();
        //}

        private ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUser()
        {
            var response = await _context.Users.ToListAsync();
            if (response == null)
            {
                return NotFound();
            }
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetUser(int id)
        {
            var response = await _context.Users.FindAsync(id);

            if (response == null)
            {
                return NotFound();
            }

            return Ok(response);
        }



        [HttpGet("{id}/verify")]
        public async Task<ActionResult<bool>> VerifyUser(int id, [FromQuery] string password)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("User Id Not Found");
            }
            return user.Password == password;
        }


        [HttpGet("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var imageFileStream = System.IO.File.OpenRead(filePath);
            return File(imageFileStream, "image/jpeg"); // Adjust MIME type as needed
        }



        [HttpPost]
        public async Task<ActionResult> AddUser(User user)
        {
            var newUser = new User
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Password = user.Password,
                Role = user.Role,
                ProfilePicture = user.ProfilePicture,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = newUser.Id }, newUser);
        }



        [HttpPost("profileimage")]
        public async Task<IActionResult> UploadProfileImage(int id, IFormFile image)
        {
            Console.Clear();
            Console.WriteLine("--------------------------------Profile Image Upload-------------------------------");
            if (image == null || image.Length == 0)
                return BadRequest("No file uploaded.");

            // Save the file to a folder (e.g., wwwroot/images)
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            if (!Directory.Exists(folderPath))
                Directory.CreateDirectory(folderPath);

            var filePath = Path.Combine(folderPath, image.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Return the URL of the uploaded image
            var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{image.FileName}";
            return Ok(new { imageUrl });
        }







        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateUser(int id, User updatedUser)
        {
            if (id != updatedUser.Id)
                return BadRequest();

            _context.Entry(updatedUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch
            {
                var user = await _context.Users.FindAsync(id);

                if (user == null)
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
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 status code
        }


    }
}
