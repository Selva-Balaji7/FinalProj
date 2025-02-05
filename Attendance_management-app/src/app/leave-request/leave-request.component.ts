import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-leave-request',
  imports: [HttpClient,FormBuilder,FormGroup],
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.css'
})
export class LeaveRequestComponent {
  leaveRequests: any[] = [];
  leaveForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.leaveForm = this.fb.group({
      userId: [null, Validators.required],
      leaveTypeId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
      reason: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchLeaveRequests();
  }

  fetchLeaveRequests() {
    this.http.get<any[]>('http://localhost:5000/api/LeaveRequests').subscribe(data => {
      this.leaveRequests = data;
    });
  }

  submitLeaveRequest() {
    this.http.post('http://localhost:5000/api/LeaveRequests', this.leaveForm.value)
      .subscribe(() => {
        alert('Leave Request Submitted!');
        this.fetchLeaveRequests();
      });
  }
}
