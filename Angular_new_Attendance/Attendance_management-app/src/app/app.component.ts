import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { AttendanceRequestStudentComponent } from './Attendance_Module/attendance-request-student/attendance-request-student.component';
import { AttendanceRequestTeacherComponent } from './Attendance_Module/attendance-request-teacher/attendance-request-teacher.component';
import { ViewAllAttendanceRequestComponent } from './Attendance_Module/view-all-attendancerequest/view-all-attendancerequest.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet,RoleComponent,AttendanceRequestStudentComponent,
    AttendanceRequestTeacherComponent,ViewAllAttendanceRequestComponent] 
})
export class AppComponent { }