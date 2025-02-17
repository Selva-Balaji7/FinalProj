import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../services/db/dbservices.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
	import { Store } from '@ngrx/store';
	import { UserState } from '../../../store/user/user.state';
import { addMessage } from '../../../common/popupmessage';

@Component({
  selector: 'app-attendance-request-teacher',
  imports: [CommonModule],
  templateUrl: './attendance-request-teacher.component.html',
  styleUrl: './attendance-request-teacher.component.css'
})
export class AttendanceRequestTeacherComponent implements OnInit {

  private userstore = inject(Store<{user:UserState}>);
  	public user:any;
  attendanceRequests: any[] = [];

  constructor(private _route:Router,private attendanceReqTeacher: DbservicesService) { }

  ngOnInit(): void {
    this.userstore.select(state => state.user).subscribe(data => this.user=data);
      if(!this.user.permissions.includes("TeachersAttendanceRequest")){
        this._route.navigate(['/']);
      }
      else
        this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceReqTeacher.getRecord('Attendancerequest/byrole?role=Teacher').subscribe(
      (data: any) => {
        this.attendanceRequests = data;
        console.log(this.attendanceRequests);
      },
      (error: any) => {
        console.error('Error fetching attendance requests', error);
      }
    );
  }

  onSubmit(request: any): void {
    console.log('Submitting request:?', request);



    const updatedData = {
      userId: request.userId,
      date: request.date,
      status: 'present',
      remarks: null
    };
    console.log('Attendance request updated successfully', updatedData);


    this.attendanceReqTeacher.postRecord('Attendance', updatedData).subscribe(
      (response: any) => {
        console.log('Attendance request updated successfully', response);


        this.attendanceReqTeacher.deleteRecord(`Attendancerequest/${request.id}`).subscribe(
          (deleteResponse: any) => {
            console.log('Attendance request deleted successfully', deleteResponse);

            this.loadAttendanceRequests();
          },
          (deleteError: any) => {
            console.error('Error deleting attendance request', deleteError);
          }
        );


        this.loadAttendanceRequests();
      },
      (error: any) => {
        console.error('Error updating attendance request', error);
      }
    );


  }



  onReject(request: any): void {
    console.log('Submitting request:', request);



    this.attendanceReqTeacher.deleteRecord(`Attendancerequest/${request.id}`).subscribe(
      (deleteResponse: any) => {
        console.log('Attendance request deleted successfully', deleteResponse);


        const updatedData = {
          userId: request.userId,
          date: request.date,
          status: 'Absent',
          remarks: null
        };
        console.log('Attendance request updated successfully', updatedData);



        this.attendanceReqTeacher.postRecord('Attendance', updatedData).subscribe(
          (response: any) => {
            console.log('Attendance request updated successfully', response);



          }
        );




        this.loadAttendanceRequests();
      },
      (deleteError: any) => {
        console.error('Error deleting attendance request', deleteError);
      }
    );

  }

  }
