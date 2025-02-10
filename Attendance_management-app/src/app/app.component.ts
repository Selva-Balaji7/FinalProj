import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AttendanceRequestTeacherComponent } from './AttendanceModule/attendance-request-teacher/attendance-request-teacher.component';
import { AttendanceRequestStudentComponent } from './AttendanceModule/attendance-request-student/attendance-request-student.component';
import { AttendanceMarkComponent } from './AttendanceModule/attendance-mark/attendance-mark.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AttendanceRequestTeacherComponent,AttendanceRequestStudentComponent,AttendanceMarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
