import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../Services/db-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-attendance-request-teacher',
  imports: [CommonModule],
  templateUrl: './attendance-request-teacher.component.html',
  styleUrl: './attendance-request-teacher.component.css'
})
export class AttendanceRequestTeacherComponent implements OnInit{


  attendanceRequests: any[] = [];

  constructor(private attendanceReqTeacher: DbservicesService) {}

  ngOnInit(): void {
    this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceReqTeacher.getRequests('Attendancerequest/byrole?role=Teacher').subscribe(
      (data:any) => {
        this.attendanceRequests = data;
        console.log(this.attendanceRequests);
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