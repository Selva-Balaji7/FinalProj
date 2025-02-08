import { Routes } from '@angular/router';
import { UserLoginComponent } from './UserModule/user-login/user-login.component';
import { UserRegistrationComponent } from './UserModule/user-registration/user-registration.component';
import { UserDashboardComponent } from './UserModule/user-dashboard/user-dashboard.component';
import { AttendanceHistoryComponent } from './AttendanceModule/attendance-history/attendance-history.component';
import { UserDetailsComponent } from './UserModule/user-details/user-details.component';
import { ViewStudentAttendanceComponent } from './AttendanceModule/view-student-attendance/view-student-attendance.component';
import { ViewTeacherAttendanceComponent } from './AttendanceModule/view-teacher-attendance/view-teacher-attendance.component';
import { ViewAllAttendanceComponent } from './AttendanceModule/view-all-attendance/view-all-attendance.component';

export const routes: Routes = [
    {path:"", component:UserLoginComponent},
    {path:"userregistration", component:UserRegistrationComponent},
    {path:"dasboard", component:UserDashboardComponent, children:[
        {path:"", component:UserDetailsComponent},
        {path:"atthistory", component:AttendanceHistoryComponent},
        {path:"studentatt", component:ViewStudentAttendanceComponent},
        {path:"teacheratt", component:ViewTeacherAttendanceComponent},
        {path:"allattendance", component:ViewAllAttendanceComponent},
    ]},
    {path:"**", component:UserLoginComponent}

];
