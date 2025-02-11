import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../services/db.service'; // Ensure correct path
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave-request-history',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './leave-request-history.component.html',
  styleUrls: ['./leave-request-history.component.css']
})
export class LeaveRequestHistoryComponent implements OnInit {
  leaveRequests: any[] = []; // Stores the leave request history

  constructor(private http: DbservicesService) {}

  ngOnInit(): void {
    this.fetchLeaveRequestHistory();
  }

  // Fetch logged-in user's leave request history
  fetchLeaveRequestHistory(): void {
    this.http.getRecord('LeaveRequestHistory').subscribe(
      (data: any) => {
        this.leaveRequests = data;
      },
      (error: any) => {
        console.error('Error fetching leave request history', error);
      }
    );
  }
}
