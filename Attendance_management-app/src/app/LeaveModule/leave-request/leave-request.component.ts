import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DbservicesService } from '../../services/db/dbservices.service'; 
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-leave-request',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {
  leaveForm: FormGroup;
  LeaveTypes: any;

  constructor(private http: DbservicesService, private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      leaveTypeId: [null, Validators.required],
      Date: [null, Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.http.getRecord('LeaveTypes').subscribe((data:any) => {
      this.LeaveTypes = data;
    });
  }

  

  submitLeaveRequest() {
    var newLeaveRequest = {
      userId:100,
      leaveTypeId: this.leaveForm.value.leaveTypeId,
      date: this.leaveForm.value.Date,
      status: 'Pending',
      reason: this.leaveForm.value.reason
    };
    console.log("Trying send leave quest for", newLeaveRequest);

    this.http.getRecord(`Attendance/check/100?Date=${newLeaveRequest.date}`).subscribe(
      (res:any) => {
        if(res){
          console.log("No attendance record found for user 100");
          console.log(`Attendancerequest/check/100?Date=${newLeaveRequest.date}`);
          this.http.getRecord(`Attendancerequest/check/100?Date=${newLeaveRequest.date}`).subscribe(
            (attendanceRequest:any) => {
              if(attendanceRequest){
                console.log("No attendanceHistory record found for user 100");
                console.log(`Leaverequests/check/100?Date=${newLeaveRequest.date}`);
                this.http.getRecord(`Leaverequests/check/100?Date=${newLeaveRequest.date}`).subscribe(
                  (leaveRequest:any) => {
                    if(leaveRequest){
                      console.log("No leaverequest record found for user 100");
                      this.http.postRecord('LeaveRequests', newLeaveRequest)
                        .subscribe(() => {
                          alert('Leave Request Submitted!');
                        });
                    }
                  }
                );    
              }
            }
          );
        }
      }
    );
  }
}
