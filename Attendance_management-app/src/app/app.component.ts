import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
//import { UserLoginComponent } from './user-login/user-login.component';
 //import { LeaveTypeComponent } from './leave-type/leave-type.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
 import { LeaveTypeComponent } from './leave-type/leave-type.component';


@Component({
  selector: 'app-root',
  imports: [LeaveTypeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
