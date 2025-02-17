import { Component, OnInit } from '@angular/core';
import { DbservicesService } from '../../services/db/dbservices.service'; 
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
	import { Store } from '@ngrx/store';
	import { UserState } from '../../../store/user/user.state';
import { addMessage } from '../../../common/popupmessage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-request-student',
  imports: [CommonModule],
  templateUrl: './attendance-request-student.component.html',
  styleUrl: './attendance-request-student.component.css'
})
export class AttendanceRequestStudentComponent {

  private userstore = inject(Store<{user:UserState}>);
  public user:any;
  attendanceRequests: any[] = [];

  constructor(private _route:Router,private attendanceReqstudent: DbservicesService) { }

  ngOnInit(): void {
    this.userstore.select(state => state.user).subscribe(data => this.user=data);
      if(!this.user.permissions.includes("StudentAttendanceRequest") ){
        addMessage({type:"warning", message:"Access Denied"});
        this._route.navigate(['/']);
      }
      else
      this.loadAttendanceRequests();
  }

  loadAttendanceRequests(): void {
    this.attendanceReqstudent.getRecord('Attendancerequest/byrole?role=Student').subscribe(
      (data: any) => {
        this.attendanceRequests = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching attendance requests', error);
      }
    );
  }

  onSubmit(request: any): void {
    console.log('Submitting request:', request);


    const updatedData = {
      userId: request.userId,
      date: request.date,
      status: 'present',
      remarks: null
    };
    console.log('Attendance request updated successfully', updatedData);


    this.attendanceReqstudent.postRecord('Attendance', updatedData).subscribe(
      (response: any) => {
        console.log('Attendance request updated successfully', response);


        this.attendanceReqstudent.deleteRecord(`Attendancerequest/${request.id}`).subscribe(
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



    this.attendanceReqstudent.deleteRecord(`Attendancerequest/${request.id}`).subscribe(
      (deleteResponse: any) => {
        console.log('Attendance request deleted successfully', deleteResponse);


        const updatedData = {
          userId: request.userId,
          date: request.date,
          status: 'Absent',
          remarks: null
        };
        console.log('Attendance request updated successfully', updatedData);



        this.attendanceReqstudent.postRecord('Attendance', updatedData).subscribe(
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
