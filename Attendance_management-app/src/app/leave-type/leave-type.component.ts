import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-leave-type',
  imports: [MatFormFieldModule,MatTableModule,ReactiveFormsModule], // Add MatTableModule here if you're using Angular standalone components
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css'], // Corrected the typo here: 'styleUrls' instead of 'styleUrl'
})
export class LeaveTypeComponent implements OnInit {
    leaveForm: FormGroup;
    leaveTypes: any[] = [];
    displayedColumns: string[] = ['id', 'name', 'description'];
    dataSource = new MatTableDataSource<any>(this.leaveTypes);
  
    constructor(private fb: FormBuilder, private http: HttpClient) {
      this.leaveForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      });
    }
  
    ngOnInit(): void {
      this.fetchLeaveTypes();
    }
  
    fetchLeaveTypes(): void {
      this.http.get<any[]>('http://localhost:5000/api/LeaveTypes').subscribe(
        (data) => {
          this.leaveTypes = data;
          this.dataSource.data = this.leaveTypes; // Update the table data source
        },
        (error) => {
          console.error('Error fetching leave types', error);
        }
      );
    }
  
    submitLeaveType(): void {
      if (this.leaveForm.valid) {
        this.http.post('http://localhost:5000/api/LeaveTypes', this.leaveForm.value).subscribe(
          () => {
            alert('Leave Type Added Successfully');
            this.leaveForm.reset();
            this.fetchLeaveTypes(); // Refresh the data
          },
          (error) => {
            console.error('Error adding leave type', error);
          }
        );
      }
    }
  
}
