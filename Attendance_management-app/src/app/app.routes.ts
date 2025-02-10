import { Routes } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { ViewAttendanceComponent } from './view-attendance/view-attendance.component';
import { LeaveRequestComponent } from './leave-request/leave-request.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { LeaveTypeComponent } from './leave-type/leave-type.component';

export const routes: Routes = [

    {path:"", component:UserLoginComponent},
    {path:"userregistration", component:UserRegistrationComponent},
    {path:"viewattendance", component:ViewAttendanceComponent},
    {path:"leaverequest", component:LeaveRequestComponent},
    {path:"editusers", component:EditUsersComponent},
    {path:"leavetype",component:LeaveTypeComponent},
    // {path:"**", component:UserLoginComponent}
];
