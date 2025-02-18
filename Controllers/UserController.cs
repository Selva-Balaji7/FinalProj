using Attendance_management.Data;
using Attendance_management.Models;
<<<<<<< HEAD
using Attendance_management.UserServices;
=======
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Attendance_management.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class UserController : ControllerBase
    {
        private ApplicationDbContext _context;
<<<<<<< HEAD
        HashServiceClass hashserv = new HashServiceClass();
=======
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

<<<<<<< HEAD
=======
        [HttpGet("getDate")]
        public ActionResult<object> GetDate()
        {
            // Get the current date
            var currentDate = DateTime.Now.ToString("yyyy-MM-dd");

            // Create an anonymous object to return as JSON
            var result = new
            {
                date = currentDate
            };

            // Return the JSON object
            return Ok(result);
        }


>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
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
<<<<<<< HEAD
        public async Task<ActionResult<bool>> VerifyUser(int id, [FromQuery] string password)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
=======
        public async Task<ActionResult<bool>> VerifyUser(int id, [FromQuery]string password)
        {
            var user = await _context.Users.FindAsync(id);

            if(user == null)
            {
                return NotFound("User Id Not Found");
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
            }
            return user.Password == password;
        }


<<<<<<< HEAD
        [HttpGet("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);
            if (!System.IO.File.Exists(filePath))
                return NotFound();

            var imageFileStream = System.IO.File.OpenRead(filePath);
            return File(imageFileStream, "image/jpeg"); // Adjust MIME type as needed
        }


=======
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87

        [HttpPost]
        public async Task<ActionResult> AddUser(User user)
        {
            var newUser = new User
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
<<<<<<< HEAD
                Password = this.hashserv.HashPassword(user.Password),
                Role = user.Role,
                ProfilePicture = user.ProfilePicture,
                CreatedAt = user.CreatedAt,
                UpdatedAt = user.UpdatedAt
=======
                Password = user.Password,
                Role = user.Role,
                ProfilePicture = user.ProfilePicture,
                //CreatedAt = user.CreatedAt,
                //UpdatedAt = user.UpdatedAt
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = newUser.Id }, newUser);
        }


<<<<<<< HEAD

        [HttpPost("{id}/profileimage")]
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





=======
        

        
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87


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

<<<<<<< HEAD
        }
=======
        } 
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
<<<<<<< HEAD
            if (user == null)
=======
            if(user == null)
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 status code
        }



    }
<<<<<<< HEAD
}
=======
}
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
