import { Routes } from '@angular/router';
import { UserLoginComponent } from './UserModule/user-login/user-login.component';
import { UserRegistrationComponent } from './UserModule/user-registration/user-registration.component';
import { UserDashboardComponent } from './UserModule/user-dashboard/user-dashboard.component';
import { AttendanceHistoryComponent } from './AttendanceModule/attendance-history/attendance-history.component';
import { UserDetailsComponent } from './UserModule/user-details/user-details.component';
import { ViewStudentAttendanceComponent } from './AttendanceModule/view-student-attendance/view-student-attendance.component';
import { ViewTeacherAttendanceComponent } from './AttendanceModule/view-teacher-attendance/view-teacher-attendance.component';
import { ViewAllAttendanceComponent } from './AttendanceModule/view-all-attendance/view-all-attendance.component';
import { ViewPermissionsComponent } from './PermissionModule/view-permissions/view-permissions.component';
import { EditPermissionsComponent } from './PermissionModule/edit-permissions/edit-permissions.component';
import { ViewRolesComponent } from './RolesModule/view-roles/view-roles.component';
import { EditRolesComponent } from './RolesModule/edit-roles/edit-roles.component';
import { ViewProfileComponent } from './UserModule/view-profile/view-profile.component';
import { NewUserRequestsComponent } from './UserModule/new-user-requests/new-user-requests.component';
import { ForgotPasswordComponent } from './UserModule/forgot-password/forgot-password.component';

export const routes: Routes = [
    {path:"", component:UserLoginComponent},
    {path:"userregistration", component:UserRegistrationComponent},
    {path:"forgotpassword", component:ForgotPasswordComponent},
    {path:"dasboard", component:UserDashboardComponent, children:[
        {path:"", component:UserDetailsComponent},
        {path:"profile", component:ViewProfileComponent},
        {path:"atthistory", component:AttendanceHistoryComponent},
        {path:"studentatt", component:ViewStudentAttendanceComponent},
        {path:"teacheratt", component:ViewTeacherAttendanceComponent},
        {path:"allattendance", component:ViewAllAttendanceComponent},
        {path:"viewpermissions", component:ViewPermissionsComponent},
        {path:"editpermissions", component:EditPermissionsComponent},
        {path:"viewroles", component:ViewRolesComponent},
        {path:"editroles", component:EditRolesComponent},
        {path:"newuserreq", component:NewUserRequestsComponent},
    ]},
    {path:"**", component:UserLoginComponent}

];
