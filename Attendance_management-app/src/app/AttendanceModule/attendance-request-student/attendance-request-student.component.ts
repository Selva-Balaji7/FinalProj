import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../Services/dbservices.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-attendance-request-student',
  imports: [CommonModule],
  templateUrl: './attendance-request-student.component.html',
  styleUrl: './attendance-request-student.component.css'
})
export class AttendanceRequestStudentComponent implements OnInit {

  attendanceRequests: any[] = [];

  constructor(private attendanceReqstudent: DbservicesService) { }

  ngOnInit(): void {
    this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceReqstudent.getRequests('Attendancerequest/byrole?role=Student').subscribe(
      (data:any) => {
        this.attendanceRequests = data;
      },
      (error:any) => {
        console.error('Error fetching attendance requests', error);
      }
    );
  }

  onSubmit(request: any): void {
    console.log('Submitting request:', request);
    // Add API call to update attendance status

  }

}
