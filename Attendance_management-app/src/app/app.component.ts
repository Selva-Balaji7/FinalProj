import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AttendanceRequestTeacherComponent } from './AttendanceModule/attendance-request-teacher/attendance-request-teacher.component';
import { AttendanceRequestStudentComponent } from './AttendanceModule/attendance-request-student/attendance-request-student.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AttendanceRequestTeacherComponent,AttendanceRequestStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
