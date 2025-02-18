using System;
using System.Collections.Generic;

namespace Attendance_management.Models;

public partial class Leavetype
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

<<<<<<< HEAD
    public virtual ICollection<Leaverequest> Leaverequests { get; set; } = new List<Leaverequest>();

    public virtual ICollection<Leaverequestshistory> Leaverequestshistories { get; set; } = new List<Leaverequestshistory>();
=======
    public virtual ICollection<Leaverequesthistory> Leaverequesthistories { get; set; } = new List<Leaverequesthistory>();

    public virtual ICollection<Leaverequest> Leaverequests { get; set; } = new List<Leaverequest>();
>>>>>>> ff435484b4f0e6ee505303c5a4e3ffc0f910cb87
}
