// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-attendance-request-teacher',
//   imports: [],
//   templateUrl: './attendance-request-teacher.component.html',
//   styleUrl: './attendance-request-teacher.component.css'
// })
// export class AttendanceRequestTeacherComponent {

// }


import { Component, OnInit } from '@angular/core';
import { AttendanceRequestService } from '../../Services/db-service.service';

@Component({
  selector: 'app-attendance-request-teacher',
  templateUrl: './attendanceRequest-Teacher.Component.html',
  styleUrls: ['./attendanceRequest-Teacher.Component.css']
})
export class AttendanceRequestTeacherComponent implements OnInit {
  attendanceRequests: any[] = [];

  constructor(private attendanceRequestService: AttendanceRequestService) {}

  ngOnInit(): void {
    this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceRequestService.getAttendanceRequests('Teacher').subscribe(
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
