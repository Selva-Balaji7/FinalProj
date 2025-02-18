using System;
using System.Collections.Generic;

namespace Attendance_management.Models;

public partial class User
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    public string? ProfilePicture { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual ICollection<Attendancerequest> Attendancerequests { get; set; } = new List<Attendancerequest>();

    public virtual ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();

<<<<<<< HEAD
    public virtual ICollection<Leaverequest> Leaverequests { get; set; } = new List<Leaverequest>();

    public virtual ICollection<Leaverequestshistory> Leaverequestshistories { get; set; } = new List<Leaverequestshistory>();
=======
    public virtual ICollection<Leaverequesthistory> Leaverequesthistories { get; set; } = new List<Leaverequesthistory>();

    public virtual ICollection<Leaverequest> Leaverequests { get; set; } = new List<Leaverequest>();
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
}
