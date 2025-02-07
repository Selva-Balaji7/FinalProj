import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AttendanceMarkComponent } from './AttendanceModule/attendance-mark/attendance-mark.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,AttendanceMarkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
