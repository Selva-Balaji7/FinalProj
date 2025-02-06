using System;
using System.Collections.Generic;

namespace Attendance_management.Models;

public partial class PermissionDto
{
    public int Id { get; set; }

    public int? RoleId { get; set; }

    public string? PermissionName { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public virtual RoleDto? Role { get; set; }
}
