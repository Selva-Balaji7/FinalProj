import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../Services/db-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-attendance-request',
  imports: [FormsModule,CommonModule],
  templateUrl: './view-all-attendance-request.component.html',
  styleUrl: './view-all-attendance-request.component.css'
})
export class ViewAllAttendanceRequestComponent implements OnInit {


  allattendanceRequests: any[] = [];

  constructor(private allAttendanceReq: DbservicesService) { }

  ngOnInit(): void {
    this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.allAttendanceReq.getRequests('Attendancerequest').subscribe(
      (data:any) => {
        this.allattendanceRequests = data;
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
