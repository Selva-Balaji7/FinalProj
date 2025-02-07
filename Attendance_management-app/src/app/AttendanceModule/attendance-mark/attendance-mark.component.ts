import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms';   // Import FormsModule
import {DbservicesService} from '../../Services/dbservices.service';
@Component({
  selector: 'app-attendance-mark',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance-mark.component.html',
  styleUrl: './attendance-mark.component.css'
})
export class AttendanceMarkComponent implements OnInit {
  role_id: number = 1; // Assume value from logged-in user
  selectedDate: string = '';
  inTime: string | null = null;
  outTime: string | null = null;
  isFullDay: boolean = false;
  attendanceRequests: any[] = [];

  constructor(private DbService:DbservicesService) {}

  ngOnInit() {
    if (this.role_id === 2 || this.role_id === 3) {
      this.loadAttendanceRequests();
    }
  }

  markInTime() {
    this.inTime = new Date().toISOString().split('T')[1].substring(0, 5);
  }

  markOutTime() {
    this.outTime = new Date().toISOString().split('T')[1].substring(0, 5);
  }

  submitRequest() {
    if (this.inTime && this.outTime) {
      let inTimeDate = new Date(`1970-01-01T${this.inTime}:00`);
      let outTimeDate = new Date(`1970-01-01T${this.outTime}:00`);
      let difference = (outTimeDate.getTime() - inTimeDate.getTime()) / (1000 * 60 * 60);
      this.isFullDay = difference >= 8;

      let requestData = {
        userId: 1, // Assume logged-in user
        date: this.selectedDate,
        status: this.isFullDay ? 'Full Day' : 'Short Fall',
        createdAt: new Date(),
      };

      this.DbService.submitAttendanceRequest(requestData).subscribe(response => {
        alert('Attendance request submitted');
      });
    } else {
      alert('Please mark both In Time and Out Time');
    }
  }

  loadAttendanceRequests() {
    this.DbService.getAttendanceRequests().subscribe(data => {
      this.attendanceRequests = data;
    });
  }

  approveAttendance(request: any, status: string) {
    request.status = status;
    this.DbService.approveAttendanceRequest(request).subscribe(response => {
      alert('Attendance updated successfully');
    });
  }

 
}
