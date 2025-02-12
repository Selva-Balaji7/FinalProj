import { Component } from '@angular/core';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teacher-leave-request',
  imports: [CommonModule],
  templateUrl: './teacher-leave-request.component.html',
  styleUrl: './teacher-leave-request.component.css'
})
export class TeacherLeaveRequestComponent {
  leaveRequests: any;
  isAttendanceMarked: boolean=false;

  constructor(private http: DbservicesService) {}

  ngOnInit(): void {
    this.fetchTeacherRequests();
  }

  fetchTeacherRequests() {
    this.http.getRecord('LeaveRequests?role=teacher')
      .subscribe((data) => {
        this.leaveRequests = data;
         console.log(this.leaveRequests);
      });
  }

  
  // Update Leave Status (Accept or Reject)
  updateLeaveStatus(request: any, status: string,) {
    // 1️ First, Check if Attendance Exists for Given Date
    this.http.getRecord(`Attendance/check/${request.user.id}?date=${request.date}`)
      .subscribe((isAttendanceMarked:any) => {
        if (isAttendanceMarked === false) {
          alert("Attendance already exists  on this date. Cannot approve leave.");
          return;
        }
  
        // 2️ If Attendance Does NOT Exist, Proceed with Updating Status
        const newAttance = { 
          userId: request.user.id,
          remarks: request.reason,
          status:status,
          date: request.date
         };
  
        this.http.postRecord(`Attendance/`, newAttance)
          .subscribe(() => {
            // 3️ Update UI to Reflect the New Status
            // this.leaveRequests = this.leaveRequests.map((request: { id: number; }) =>
            //   request.id === requestId ? { ...request, status } : request
            // );
  
            // alert(`Leave request has been updated to ${status}`);
            this.deleteLeaveRequest(request.id);
          }, (error: any) => {
            console.error("Error updating leave request:", error);
          });
      });
  }
  

// Delete leave request
deleteLeaveRequest(requestId: number) {
  this.http.deleteRecord(`LeaveRequests/${requestId}`)
    .subscribe(() => {
      // this.leaveRequests = this.leaveRequests.filter((request: { id: number; }) => request.id !== requestId);
      alert('Leave request has been deleted.');
      this.fetchTeacherRequests();
    }, (error: any) => {
      console.error('Error deleting leave request:', error);
    });
}
}
