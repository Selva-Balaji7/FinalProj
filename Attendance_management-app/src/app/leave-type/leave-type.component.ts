import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-leave-type',
  imports: [MatFormFieldModule,MatTableModule], // Add MatTableModule here if you're using Angular standalone components
  templateUrl: './leave-type.component.html',
  styleUrls: ['./leave-type.component.css'], // Corrected the typo here: 'styleUrls' instead of 'styleUrl'
})
export class LeaveTypeComponent implements OnInit {
  leaveTypes: any[] = [];
  
  // Declare the columns you want to display in the table
  displayedColumns: string[] = ['id', 'name', 'description']; // You can adjust the columns as needed

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchLeaveTypes();
  }

  fetchLeaveTypes() {
    this.http.get<any[]>('http://localhost:5000/api/LeaveTypes').subscribe((data) => {
      this.leaveTypes = data;
    });
  }

  
}
