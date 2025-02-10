import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PermissionComponent } from './permission/permission.component';
import { RoleComponent } from './role/role.component';
import { AttendanceRequestStudentComponent } from './Attendance_Module/attendance-request-student/attendance-request-student.component';
import { AttendanceRequestTeacherComponent } from './Attendance_Module/attendance-request-teacher/attendance-request-teacher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PermissionComponent,RoleComponent,AttendanceRequestStudentComponent,AttendanceRequestTeacherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
