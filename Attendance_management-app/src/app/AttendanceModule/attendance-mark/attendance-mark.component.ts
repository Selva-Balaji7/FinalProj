import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-attendance-mark',
  imports: [CommonModule,FormsModule],
  templateUrl: './attendance-mark.component.html',
  styleUrl: './attendance-mark.component.css'
})
export class AttendanceMarkComponent  {
  
// user:any = {id:100, name:"William", email:"william@gmail.com",role:"student", permisssions:["","",""],
    
  // }


  role: string = "Teacher";  // Role of the user (Student, Teacher, Admin)



  attendance = { date: '' };  // Stores selected date
  studentRequests = [  // Sample student attendance requests
    { studentName: 'John Doe', date: '2025-02-07' },
    { studentName: 'Jane Smith', date: '2025-02-06' }
  ];
  teacherRequests = [  // Sample teacher attendance requests
    { teacherName: 'Mr. Brown', date: '2025-02-07' },
    { teacherName: 'Ms. Green', date: '2025-02-06' }
  ];


  // ngOnInit() {
  //   // Assume we get user role from authentication service
  //   this.role = localStorage.getItem('userRole') || 'Student'; // Change this for testing
  // }



  // Student submits attendance request
  submitAttendanceRequest() {
    if (!this.attendance.date) {
      alert('Please select a date.');
      return;
    }
    alert(`Attendance request submitted for ${this.attendance.date}`);
    // Call API to save attendance request for teacher approval
  }
  // Teacher/Admin marks attendance
  markAttendance(request: any, status: string) {
    alert(`${request.studentName || request.teacherName} marked as ${status} on ${request.date}`);
    // Call API to update attendance status
  }







}
