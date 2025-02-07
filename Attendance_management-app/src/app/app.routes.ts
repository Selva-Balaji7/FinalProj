import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';

export const routes: Routes = [

    {path:"", component:UserLoginComponent},
    {path:"userregistration", component:UserRegistrationComponent},
    {path:"viewattendance", component:ViewAttendanceComponent},
    {path:"leaverequest", component:LeaveRequestComponent}
    // {path:"**", component:UserLoginComponent}
];
