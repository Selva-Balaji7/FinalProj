import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AttendanceRequestTeacherComponent } from './AttendanceModule/attendance-request-teacher/attendance-request-teacher.component';
import { AttendanceRequestStudentComponent } from './AttendanceModule/attendance-request-student/attendance-request-student.component';
import { AttendanceMarkComponent } from './AttendanceModule/attendance-mark/attendance-mark.component';
import { ViewAllAttendancerequestComponent } from './AttendanceModule/view-all-attendancerequest/view-all-attendancerequest.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AttendanceRequestTeacherComponent,AttendanceRequestStudentComponent,AttendanceMarkComponent,ViewAllAttendancerequestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
