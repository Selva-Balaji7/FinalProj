<<<<<<< HEAD
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
=======
using System.Diagnostics;
using Attendance_management.Models;
using Microsoft.AspNetCore.Mvc;
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87

namespace Attendance_management.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
