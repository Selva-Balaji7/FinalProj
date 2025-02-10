import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-type',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css'],
})
export class LeaveTypeComponent implements OnInit {
  leaveForm: FormGroup;
  leaveTypes: any[] = []; // Stores leave type data

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.leaveForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchLeaveTypes();
  }

  // Fetch existing leave types from API
  fetchLeaveTypes(): void {
    this.http.get<any[]>('http://localhost:7189/api/LeaveTypes').subscribe(
      (data) => {
        this.leaveTypes = data;
      },
      (error) => {
        console.error('Error fetching leave types', error);
      }
    );
  }

  // Submit a new leave type
  submitLeaveType(): void {
    if (this.leaveForm.valid) {
      this.http.post('http://localhost:7189/api/LeaveTypes', this.leaveForm.value).subscribe(
        () => {
          alert('Leave Type Added Successfully');
          this.leaveForm.reset();
          this.fetchLeaveTypes(); // Refresh the table
        },
        (error) => {
          console.error('Error adding leave type', error);
        }
      );
    }
  }
}
