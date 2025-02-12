import { Component } from '@angular/core';
import { DbservicesService } from '../services/db.service';
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
    this.http.getRecord(`LeaveRequests/${100}`)
      .subscribe((data) => {
        this.leaveRequests = data;
        console.log(this.leaveRequests);
      });
  }


  // // // Delete leave request
  deleteLeaveHistory(requestId: number) {
    if (confirm("Are you sure you want to delete this leave request?")) {
      this.http.deleteRecord(`LeaveRequests/${requestId}`)
        .subscribe(() => {
          this.fetchAllRequests();
        });
    }
  }
}
