import { Component } from '@angular/core';
import { DbservicesService } from '../../Services/dbservices.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-all-attendancerequest',
  imports: [CommonModule,FormsModule],
  templateUrl: './view-all-attendancerequest.component.html',
  styleUrl: './view-all-attendancerequest.component.css'
})
export class ViewAllAttendancerequestComponent {


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
