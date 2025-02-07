import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
  // import { UserLoginComponent } from './user-login/user-login.component';
  // import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
//  //import { LeaveTypeComponent } from './leave-type/leave-type.component';
// import { LeaveRequestComponent } from './leave-request/leave-request.component';
//  import { LeaveTypeComponent } from './leave-type/leave-type.component';
//  import { UserLoginComponent } from './user-login/user-login.component';
//  import { UserRegistrationComponent } from './user-registration/user-registration.component';
//  import { RolesComponent } from './roles/roles.component';
//  import { PermissionComponent } from './permission/permission.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Attendance_management-app';
}
