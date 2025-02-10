import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DbservicesService } from '../../Services/dbservices.service';

@Component({
  selector: 'app-attendance-mark',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance-mark.component.html',
  styleUrl: './attendance-mark.component.css'
})
export class AttendanceMarkComponent  {
  
  attendanceDate: string = '';  
  userId: number = 1;
  constructor(private attendancemark: DbservicesService) {}

  submitAttendance() {
    if (!this.attendanceDate) {
      alert('Please select a date before submitting.');
      return;
    }

    const attendanceData = {
      date: this.attendanceDate,
      userId: this.userId
    };

    this.attendancemark.markAttendance(attendanceData).subscribe({
      next: () => {
        alert('Attendance marked successfully!');
        this.attendanceDate = ''; // Reset the input after submission
      },
      error: (error) => {
        console.error('Error marking attendance:', error);
        alert('Failed to mark attendance. Please try again.');
      }
    });
  }





}


/*


import { Component } from '@angular/core';
import { attendancemark } from '../services/attendance.service';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent {
  attendanceDate: string = '';  // Holds the selected date
  userId: number = 1; // Replace with the actual logged-in user ID

  constructor(private attendancemark: attendancemark) {}

  submitAttendance() {
    if (!this.attendanceDate) {
      alert('Please select a date before submitting.');
      return;
    }

    const attendanceData = {
      date: this.attendanceDate,
      userId: this.userId
    };

    this.attendancemark.markAttendance(attendanceData).subscribe({
      next: () => {
        alert('Attendance marked successfully!');
        this.attendanceDate = ''; // Reset the input after submission
      },
      error: (error) => {
        console.error('Error marking attendance:', error);
        alert('Failed to mark attendance. Please try again.');
      }
    });
  }
}.    




*/