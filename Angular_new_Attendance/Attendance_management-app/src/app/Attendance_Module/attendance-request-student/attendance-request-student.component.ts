//import { Component } from '@angular/core';
// import { AttendanceRequestsService } from '../attendance-request-student';
//pc
//import { AttendanceRequestsService } from '../attendance-request-student.service'; 

// @Component({
//   selector: 'app-attendance-request-student',
//   imports: [],
//   templateUrl: './attendance-request-student.component.html',
//   styleUrl: './attendance-request-student.component.css'
// })
// export class AttendanceRequestStudentComponent {

  // attendanceRequests: any[] = [];

  // constructor(private attendanceRequestsService: AttendanceRequestsService) {}

  // ngOnInit(): void {
  //   this.loadRequests();
  // }

  // loadRequests(): void {
  //   this.attendanceRequestsService.getAllRequests().subscribe((data) => {
  //     this.attendanceRequests = data;
  //   });
  // }

//    onSubmit(request: any): void {
//      console.log('Request submitted:', request);
//    }
// }


import { Component, OnInit } from '@angular/core';
import { AttendanceRequestService } from '../../Services/db-service.service'

@Component({
  selector: 'app-attendance-request-student',
  templateUrl: './attendanceRequest-Student.Component.html',
  styleUrls: ['./attendanceRequest-Student.Component.css']
})
export class AttendanceRequestStudentComponent implements OnInit {
  attendanceRequests: any[] = [];

  constructor(private attendanceRequestService: AttendanceRequestService) {}

  ngOnInit(): void {
    this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceRequestService.getAttendanceRequests('Student').subscribe(
      (data) => {
        this.attendanceRequests = data;
      },
      (error) => {
        console.error('Error fetching attendance requests', error);
      }
    );
  }

  onSubmit(request: any): void {
    console.log('Submitting request:', request);
    // Add API call to update attendance status
  }
}