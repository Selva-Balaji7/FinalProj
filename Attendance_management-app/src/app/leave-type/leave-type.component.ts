import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DbservicesService } from '../services/db.service'; // Ensure correct path

@Component({
  selector: 'app-leave-type',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css'],
})
export class LeaveTypeComponent implements OnInit {
  leaveForm: FormGroup;
  leaveTypes: any; // Stores leave type data
  //private apiUrl = 'https://localhost:7189/api/LeaveTypes'; // Ensure correct path
  

  constructor(private fb: FormBuilder, private http: DbservicesService, private _route: Router) {
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
    this.http.getRecord('LeaveTypes').subscribe(
      (data: any) => {
        this.leaveTypes = data;
      },
      (error: any) => {
        console.error('Error fetching leave types', error);
      }
    );
  }

  // Submit a new leave type
  submitLeaveType(): void {
    if (this.leaveForm.valid) {
      this.http.postRecord('LeaveTypes', this.leaveForm.value).subscribe(
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

  
  deleteLeaveType(id: number) {
    console.log('Deleting Leave Type', id); 
    if (confirm('Are you sure you want to delete this Leave type?')) {
      this.http.deleteRecord(`LeaveTypes/${id}`).subscribe(() => this.fetchLeaveTypes());
    }
    (error: any) => {
      console.error('Error deleting Leave Type:', error);
    }
  }
}
