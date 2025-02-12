import { Component } from '@angular/core';
import { DbservicesService } from '../../services/db/dbservices.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-request-history',
  imports: [CommonModule,FormsModule],
  templateUrl: './leave-request-history.component.html',
  styleUrl: './leave-request-history.component.css'
})
export class LeaveRequestHistoryComponent {
  leaveRequests: any;
  newRequest = { userName: '', leaveType: '', date: '', reason: '' };

  constructor(private http: DbservicesService) {}

  ngOnInit(): void {
    this.fetchAllRequests();
  }

  // Fetch all leave requests
  fetchAllRequests() {
    this.http.getRecord('LeaveRequests?role=null')
      .subscribe((data) => {
        this.leaveRequests = data;
        console.log(this.leaveRequests);
      });
  }

  // // Add new leave request
  // addLeaveRequest() {
  //   this.http.postRecord('LeaveRequests', this.newRequest)
  //     .subscribe((newData) => {
  //       this.leaveRequests.push(newData);
  //       this.newRequest = { userName: '', leaveType: '', date: '', reason: '' }; // Reset form
  //     });
  // }

  // // Update existing leave request
  // editLeaveHistory(request: any) {
  //   this.http.updateRecord(`LeaveRequests/${request.id}`, request)
  //     .subscribe(() => {
  //       alert("Leave Request history Updated!");
  //     });
  // }

  // // // Delete leave request
  deleteLeaveHistory(requestId: number) {
    if (confirm("Are you sure you want to delete this leave request?")) {
      this.http.deleteRecord(`LeaveRequests/${requestId}`)
        .subscribe(() => {
          this.leaveRequests = this.leaveRequests.filter((req: { id: number; }) => req.id !== requestId);
        });
    }
  }
}
