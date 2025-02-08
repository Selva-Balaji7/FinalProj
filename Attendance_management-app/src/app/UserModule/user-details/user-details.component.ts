import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserState } from '../../../store/user/user.state';
import { saveUserData } from '../../../store/user/user.actions';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  public PermissionList = 
["ViewProfile"/*0*/,"EditProfile"/*1*/,"MarkAttendance"/*2*/,"AttendanceHistory"/*3*/,"ViewStudentAttendance"/*4*/,
"ViewTeacherAttendance"/*5*/,"ViewAllAttendance"/*6*/,"ViewRoles"/*7*/,"EditRoles"/*8*/,"ViewPermissions"/*9*/,
"EditPermissions"/*10*/,"LeaveHistory"/*11*/,"MakeLeaveRequest"/*12*/,"StudentLeaveRequest"/*13*/,"TeacherLeaveRequest"/*14*/, 
"EditAttendance"/*15*/, "StudentAttendanceRequest"/*16*/, "TeachersAttendanceRequest"/*17*/, "EditUsers"/*18*/, "ViewUsers"/*19*/]

  private userstore = inject(Store<{user:UserState}>)
   public user:any;
 
   constructor(private _route:Router){}
   
   ngOnInit(){
     this.userstore.select(state => state.user).subscribe(date => this.user=date);
     if(!this.user.id){
       var localuser:any = localStorage.getItem('user');
       if(!!localuser){
         this.userstore.dispatch(saveUserData(JSON.parse(localuser)));
       }
       else{
         this._route.navigate(['/']);
       }
     }

     
   }
}
