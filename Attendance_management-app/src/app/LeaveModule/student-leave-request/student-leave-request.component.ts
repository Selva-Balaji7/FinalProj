import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../services/db/dbservices.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-leave-request',
  imports: [CommonModule],
  templateUrl: './student-leave-request.component.html',
  styleUrl: './student-leave-request.component.css'
})
export class StudentLeaveRequestComponent implements OnInit {
  leaveRequests: any;
  isAttendanceMarked: boolean=false;

  constructor(private http: DbservicesService) {}

  ngOnInit(): void {
    this.fetchStudentRequests();
  }

  fetchStudentRequests() {
    this.http.getRecord('LeaveRequests?role=student')
      .subscribe((data) => {
        this.leaveRequests = data;
         console.log(this.leaveRequests);
      });
  }

  
  // Update Leave Status (Accept or Reject)
  updateLeaveStatus(request: any, status: string,) {
    // 1️ First, Check if Attendance Exists for Given Date
    this.http.getRecord(`Attendance/check/${request.user.id}?date=${request.date}`)
      .subscribe(isAttendanceMarked => {
        if (isAttendanceMarked === false) {
          alert("Attendance already exists for this user on this date. Cannot approve leave.");
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
      this.fetchStudentRequests();
    }, (error: any) => {
      console.error('Error deleting leave request:', error);
    });
}
}
